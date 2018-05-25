/**
 * External dependencies
 */
import React from 'react';
import { stringify } from 'querystringify';
import { isEmpty, trim, isPlainObject, mapValues, isEqual, noop, pick } from 'lodash';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { addressToMapString } from 'utils/geo-data';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect, select, dispatch } from '@wordpress/data';
import { Component, compose } from '@wordpress/element';
import './style.pcss';

import {
	withAPIData,
	Spinner,
	Placeholder,
	ToggleControl,
	PanelBody,
	Dashicon,
} from '@wordpress/components';

import {
	RichText,
	InspectorControls,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import {
	SearchOrCreate,
	VenueForm,
	toFields,
	toVenue,
} from 'elements';

import VenueDetails from './venue';
import { store } from 'data/venues';
import { store as VenueStore, STORE_NAME as VENUE_STORE_NAME } from 'data/venue';
import { GoogleMap } from 'elements';

/**
 * Module Code
 */

class EventVenue extends Component {
	constructor( props ) {
		super( ...arguments );

		const { attributes } = this.props;
		const { eventVenueId } = attributes;

		this.state = {
			loading: !! eventVenueId,
			details: {},
			coordinates: {},
			address: '',
			edit: false,
			create: false,
			submit: false,
			draft: {},
		};
		this.unsubscribe = noop;
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { isSelected } = nextProps;
		const { edit, create } = prevState;

		if ( ! isSelected && ( edit || create ) ) {
			return { submit: true };
			// return { edit: false, create: false };
		}
		return null;
	}

	componentDidMount() {
		const { attributes } = this.props;
		const { eventVenueId } = attributes;
		if ( eventVenueId ) {
			select( VENUE_STORE_NAME ).getDetails( eventVenueId );
		}
		this.unsubscribe = VenueStore.subscribe( this.listenStore );
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	listenStore = () => {
		const state = VenueStore.getState();
		const VALID_FIELDS = [ 'details', 'address', 'coordinate', 'draft', 'edit', 'create', 'loading', 'submit' ];
		this.setState( pick( state, VALID_FIELDS ) );
	}

	render() {
		return [ this.renderBlock(), this.renderControls() ];
	}

	renderBlock() {
		const { attributes } = this.props;
		const { showMap } = attributes;

		const containerClass = classNames(
			'tribe-editor-block',
			'tribe-venue__block',
			{
				'tribe-venue__block-container': this.hasVenue(),
				'tribe-venue__container--has-map': this.hasVenue() && showMap,
			},
		);

		return (
			<div key="event-venue-box" className={ containerClass }>
				{ this.getContainer() }
				{ this.renderMap() }
				{ this.editActions() }
			</div>
		);
	}

	getContainer() {
		const { loading, edit, create, submit } = this.state;

		if ( loading || submit ) {
			return (
				<Placeholder key="loading">
					<Spinner />
				</Placeholder>
			);
		}

		if ( edit || create ) {
			return this.renderForm();
		}

		return this.hasVenue() ? this.renderDetails() : this.renderSearchOrCreate();
	}

	renderDetails() {
		const { attributes } = this.props;
		const { showMapLink } = attributes;
		const { details, address } = this.state;

		return (
			<VenueDetails
				venue={ details }
				address={ address }
				showMapLink={ showMapLink }
			/>
		);
	}

	renderSearchOrCreate() {
		const { isSelected } = this.props;
		return (
			<SearchOrCreate
				icon={ <Dashicon icon="location" size={ 22 } /> }
				store={ store }
				selected={ isSelected }
				onSelection={ this.setVenue }
				onSetCreation={ this.setDraftTitle }
			/>
		);
	}

	renderForm = () => {
		const { draft } = this.state;
		return (
			<VenueForm
				{ ...toFields( draft ) }
				onSubmit={ this.onSubmit }
			/>
		);
	}

	onSubmit = ( fields ) => {
		const { edit, create, draft } = this.state;
		if ( edit ) {
			const { id } = draft;
			VenueStore.dispatch( {
				type: 'EDIT_DRAFT',
				id: id,
				fields: toVenue( fields ),
			} );
		} else if ( create ) {
			VenueStore.dispatch( {
				type: 'CREATE_DRAFT',
				fields: toVenue( fields ),
			} );
		}
	}

	setVenue = ( venue ) => {
		VenueStore.dispatch( {
			type: 'SET_DETAILS',
			id: venue.id,
			details: venue,
		} );

		const { setAttributes } = this.props;
		setAttributes( { eventVenueId: venue.id } );
	}

	setDraftTitle = ( title ) => {
		VenueStore.dispatch({ type: 'CLEAR' });
		VenueStore.dispatch({
			type: 'SET_DRAFT_TITLE',
			title: title,
		});
	}

	hasVenue() {
		const { details } = this.state;
		return ! isEmpty( details );
	}

	renderMap() {
		const { attributes } = this.props;
		const { showMap } = attributes;
		const { details, address, coordinates, edit, create } = this.state;

		if ( ! showMap || isEmpty( details ) || edit || create ) {
			return null;
		}

		return (
			<GoogleMap
				size={ { width: 450, height: 353 } }
				coordinates={ coordinates }
				address={ addressToMapString( address ) }
				interactive={ true }
			/>
		);
	}

	editActions() {
		const { isSelected } = this.props;
		const { edit, create } = this.state;
		if ( ! this.hasVenue() || ! isSelected || edit || create ) {
			return null;
		}

		return (
			<div className="tribe-venue__actions">
				{ this.isDraft() && <button onClick={ this.edit }><Dashicon icon="edit" /></button> }
				<button onClick={ this.removeVenue }><Dashicon icon="trash" /></button>
			</div>
		);
	}

	isDraft() {
		const { details } = this.state;
		const { status } = details;
		return 'draft' === status;
	}

	removeVenue = () => {
		VenueStore.dispatch( {
			type: 'CLEAR',
		} );
		const { setAttributes } = this.props;
		setAttributes( { eventVenueId: 0 } );
	}

	edit = () => {
		const { details } = this.state;
		VenueStore.dispatch( {
			type: 'SET_DRAFT_DETAILS',
			draft: details,
		} );
	};

	renderControls() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			showMapLink,
			showMap,
		} = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Venue Map Settings' ) }>
					<ToggleControl
						label={ __( 'Show Google Maps Link' ) }
						checked={ ! ! showMapLink }
						onChange={ ( value ) => setAttributes( { showMapLink: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Google Maps Embed' ) }
						checked={ ! ! showMap }
						onChange={ ( value ) => setAttributes( { showMap: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

/*
const applySelect = withSelect( ( select, props ) => {
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
	const venue = meta._EventVenueID ? meta._EventVenueID : null;
	return {
		venue: venue,
		eventVenueId: meta._EventVenueID,
	};
} );



*/

/**
 * Code that is used to create a new venue
 *
 *
 updateAddress = ( address ) => {
		if ( ! address ) {
			return;
		}

		const venue = this.getVenue();

		geocodeByAddress( address )
			.then( results => getLatLng( results[ 0 ] ) )
			.then( latLng => {
				this.setState( { coordinates: latLng, address: address } );
				this.updateCoodinates( venue, latLng );
				console.debug( 'Successfully Geocoded Address', latLng, address, venue );
			} )
			.catch( error => {
				console.debug( 'Error on Geocoding Address', error, address, venue );
			} );
	};

 updateCoodinates = ( venue, center ) => {
		if ( isPlainObject( center ) ) {
			center = mapValues( center, parseFloat );
		}

		if ( ! venue.meta._VenueLat || ! venue.meta._VenueLng ) {
			const currentCenter = mapValues( { lat: venue.meta._VenueLat, lng: venue.meta._VenueLng }, parseFloat );

			if ( isEqual( center, currentCenter ) ) {
				return null;
			}
		}

		const basePath = wp.api.getPostTypeRoute( POST_TYPE );
		const request = wp.apiRequest( {
			path: `/wp/v2/${ basePath }/${ venue.id }`,
			method: 'POST',
			data: {
				meta: {
					_VenueLat: center.lat,
					_VenueLng: center.lng,
				},
			},
		} );

		request.done( ( newPost ) => {
			if ( ! newPost.id ) {
				console.warning( 'Invalid update of venue coordinates:', newPost );
			}
		} ).fail( ( err ) => {
			console.error( err );
		} );
	};
 */
export default EventVenue;
