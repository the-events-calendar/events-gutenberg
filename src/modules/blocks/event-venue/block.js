/**
 * External dependencies
 */
import moment from 'moment';
import { stringify } from 'querystringify';
import { union, without, isEmpty, trim, isPlainObject, mapValues, isEqual } from 'lodash';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	withAPIData,
	Spinner,
	Placeholder,
	ToggleControl,
	PanelBody,
} from '@wordpress/components';

import {
	RichText,
	PlainText,
	InspectorControls,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	MetaGroup,
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

		this.getVenue = this.getVenue.bind( this );
		this.getAddress = this.getAddress.bind( this );
		this.isLoading = this.isLoading.bind( this );

		this.updateCoodinates = this.updateCoodinates.bind( this );
		this.updateAddress = this.updateAddress.bind( this );

		this.state = {
			venue: undefined,
		};
	}

	renderTitle() {
		const { attributes, setAttributes, focus, setFocus } = this.props;

		return (
			<RichText
				tagName="h3"
				className="tribe-events-single-section-title"
				value={ attributes.venueTitle }
				onChange={ ( nextContent ) => {
					if ( ! nextContent ) {
						nextContent = __( 'Venue', 'events-gutenberg' );
					}

					setAttributes( {
						venueTitle: nextContent,
					} );
				} }
				focus={ focus && 'venueTitle' === focus.editable ? focus : undefined }
				onFocus={ ( focusValue ) => setFocus( { editable: 'venueTitle', ...focusValue } ) }
				placeholder={ __( 'Venue', 'events-gutenberg' ) }
				formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
			/>
		);
	}

	getVenue() {
		if ( ! this.props.venue ) {
			return null;
		}

		if ( this.props.venue.id ) {
			return this.props.venue;
		}

		const venues = this.props.venue.data;
		if ( ! venues || ! venues.length ) {
			return null;
		}

		return venues[ 0 ];
	}

	isLoading() {
		if ( ! this.props.venue || this.props.venue.id ) {
			return false;
		}

		return this.props.venue.isLoading;
	}

	getAddress( venue = null ) {
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

		const address = trim( `${ _VenueAddress } ${ _VenueCity } ${ _VenueProvince } ${ _VenueZip } ${ _VenueCountry }` );

		// If it's an empty string we return boolean
		if ( isEmpty( address ) ) {
			return false;
		}

		return address;
	}

	updateCoodinates( venue, center ) {
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
			console.log( err );
		} );
	}

	updateAddress( address ) {
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
	}

	render() {
		const {
			attributes,
			setAttributes,
			focus,
			setFocus,
			isSelected,
		} = this.props;

		const {
			showMapLink,
			showMap,
		} = attributes;

		const venue = this.getVenue();
		let venueContainer = (
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
				removeVenue={ () => {
					setAttributes( { eventVenueId: 0 } );
					this.setState( { venue: undefined } );
				} }
				showMap={ showMap }
				showMapLink={ showMapLink }
			/>
		);

		if ( this.isLoading() ) {
			venueContainer = (
				<Placeholder key="loading">
					<Spinner />
				</Placeholder>
			);
		}

		let block = (
			<MetaGroup groupKey="event-venue-map" className="column-full-width">
				{ this.renderTitle() }
				{ venueContainer }
			</MetaGroup>
		);

		if ( venue && this.getAddress() && showMap ) {
			block = (
				<div>
					<MetaGroup groupKey="event-venue-details" className="column-1-3">
						{ this.renderTitle() }
						{ venueContainer }
					</MetaGroup>
					<MetaGroup groupKey="event-venue-map" className="column-2-3">
						<VenueMap
							key={ `venue-map-${ venue.id }` }
							venue={ this.getVenue() }
						/>
					</MetaGroup>
				</div>
			);
		}

		const content = [
			<div key="event-venue-box" className="tribe-editor-block tribe-editor-event-venue">
				{ block }
			</div>,
			isSelected && (
				<InspectorControls key="inspector">
					<PanelBody title={ __( 'Venue Map Settings' ) }>
						<ToggleControl
							label={ __( 'Show Google Maps Link' ) }
							checked={ !! showMapLink }
							onChange={ ( value ) => setAttributes( { showMapLink: value } ) }
						/>
						<ToggleControl
							label={ __( 'Show Google Maps Embed' ) }
							checked={ !! showMap }
							onChange={ ( value ) => setAttributes( { showMap: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
			),
		];

		return content;
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
