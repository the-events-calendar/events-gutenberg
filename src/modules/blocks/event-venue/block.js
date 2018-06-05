/**
 * External dependencies
 */
import React from 'react';
import { isEmpty, noop, pick, get } from 'lodash';
import { addressToMapString } from 'utils/geo-data';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { Component } from '@wordpress/element';
import './style.pcss';

import {
	Spinner,
	Placeholder,
	ToggleControl,
	PanelBody,
	Dashicon,
} from '@wordpress/components';

import {
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
	GoogleMap,
} from 'elements';

import VenueDetails from './venue';
import { store, STORE_NAME } from 'data/venues';
import { store as VenueStore, STORE_NAME as VENUE_STORE_NAME } from 'data/venue';

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

		// Submit form if we are no longer selected are we are editing or creating.
		if ( ! isSelected && ( edit || create ) ) {
			return { submit: true };
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
		const VALID_FIELDS = [
			'details', 'address', 'coordinate', 'draft', 'edit', 'create', 'loading', 'submit',
		];
		this.setState( pick( state, VALID_FIELDS ), this.saveCreated( state.created ) );
	}

	saveCreated( venues = [] ) {
		return () => {
			const { setAttributes } = this.props;
			const { details } = this.state;
			const id = get( details, 'id', 0 );
			const selected_drafts = venues.filter( ( venue_id ) => venue_id !== id );
			setAttributes( {
				eventVenueId: id,
				tempVenues: selected_drafts,
			} );
		};
	}

	render() {
		return [ this.renderBlock(), this.renderControls() ];
	}

	renderBlock() {
		const { attributes } = this.props;
		const { showMap } = attributes;

		const containerClass = classNames(
			'tribe-editor__block',
			{
				'tribe-editor__venue': this.hasVenue(),
				'tribe-editor__venue--has-map': this.hasVenue() && showMap,
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
				storeName={ STORE_NAME }
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
		VenueStore.dispatch( {
			type: 'SET_DRAFT_TITLE',
			title: title,
		} );
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
			<div className="tribe-editor__venue__actions">
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

export default EventVenue;
