/**
 * External dependencies
 */
import React from 'react';
import { stringify } from 'querystringify';
import { isEmpty, trim, isPlainObject, mapValues, isEqual, isUndefined } from 'lodash';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
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
	VenueMap,
} from 'elements';

import { default as VenueDetails } from './venue';

/**
 * Module Code
 */
const POST_TYPE = 'tribe_venue';

class EventVenue extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			venue: undefined,
		};
	}

	getVenue = () => {
		const { venue } = this.props;
		if ( ! venue ) {
			return null;
		}

		if ( venue.id ) {
			return venue;
		}

		const venues = venue.data;
		if ( ! venues || ! venues.length ) {
			return null;
		}

		return venues[ 0 ];
	};

	isLoading = () => {
		const { venue } = this.props;
		if ( ! venue || venue.id ) {
			return false;
		}

		return venue.isLoading;
	};

	getAddress = ( venue = null ) => {
		// If we don't have a venue we fetch the one in the state
		if ( ! venue ) {
			venue = this.getVenue();
		}

		// if we still don't have venue we don't have an address
		if ( ! venue ) {
			return false;
		}

		// Get the meta for us to work with
		const { meta } = venue;

		// Validate meta before using it
		if ( isEmpty( meta ) ) {
			return false;
		}

		const {
			_VenueAddress,
			_VenueCity,
			_VenueProvince,
			_VenueZip,
			_VenueCountry,
		} = meta;

		const address = trim(
			`${ _VenueAddress } ${ _VenueCity } ${ _VenueProvince } ${ _VenueZip } ${ _VenueCountry }`
		);

		// If it's an empty string we return boolean
		if ( isEmpty( address ) ) {
			return false;
		}

		return address;
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
		if ( this.isLoading() ) {
			return (
				<Placeholder key="loading">
					<Spinner/>
				</Placeholder>
			);
		}

		const {
			setAttributes,
			attributes,
			focus,
		} = this.props;
		const { showMapLink } = attributes;
		const venue = this.getVenue();

		return (
			<VenueDetails
				focus={ ! venue ? true : focus }
				venue={ this.getVenue() }
				isLoading={ this.isLoading() }
				getAddress={ this.getAddress }
				addVenue={ next => {
					if ( ! next ) {
						return;
					}

					setAttributes( { eventVenueId: next.id } );
					this.setState( { venue: next } );
					this.updateAddress( this.getAddress() );
				} }
				showMapLink={ showMapLink }
			/>
		);
	}

	hasVenue() {
		return this.getVenue() && this.getAddress();
	}

	renderMap() {
		const { attributes } = this.props;
		const { showMap } = attributes;
		if ( ! showMap ) {
			return null;
		}

		const venue = this.getVenue();
		return (
			<VenueMap
				key={ `venue-map-${ venue.id }` }
				venue={ this.getVenue() }
			/>
		);
	}

	editActions() {
		const { isSelected } = this.props;
		if ( ! this.hasVenue() || ! isSelected ) {
			return null;
		}

		return (
			<div className="tribe-venue__actions">
				<button><Dashicon icon="edit" /></button>
				<button onClick={ this.removeVenue }><Dashicon icon="trash" /></button>
			</div>
		);
	}

	removeVenue = () => {
		const { setAttributes } = this.props;
		setAttributes( { eventVenueId: 0 } );
		this.setState( { venue: undefined } );
	}

	componentDidUpdate() {
		console.log('RENDER');
	}

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

const applySelect = withSelect( ( select, props ) => {
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
	const venue = meta._EventVenueID ? meta._EventVenueID : null;
	return {
		venue: venue,
		eventVenueId: meta._EventVenueID,
	};
} );

const applyWithAPIData = withAPIData( ( props ) => {
	const { venue } = props;
	const query = {
		per_page: 1,
		orderby: 'modified',
		status: [ 'draft', 'publish' ],
		order: 'desc',
		include: venue,
	};

	if ( ! venue ) {
		return {
			venue: null,
		};
	}

	return {
		venue: `/wp/v2/${ POST_TYPE }?${ stringify( query ) }`,
	};
} );

export default compose(
	applySelect,
	applyWithAPIData,
)( EventVenue );
