/**
 * External dependencies
 */
import moment from 'moment';
import { connect } from 'react-redux';
import { stringify } from 'querystringify';
import { union, without, isEmpty, trim } from 'lodash';

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data'
import { __ } from '@wordpress/i18n';
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon
} from '@wordpress/components';

import {
	RichText,
	PlainText,
} from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import {
	MetaGroup,
	MapContainer,
} from 'elements'

import { default as VenueComponent } from './venue'

/**
 * Module Code
 */

class EventVenue extends Component {
	constructor() {
		super( ...arguments );
	}

	updateAddress = ( address ) => {
		this.map.updateAddress( address ) // do stuff
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
						nextContent = __( 'Venue', 'the-events-calendar' );
					}

					setAttributes( {
						venueTitle: nextContent
					} );
				} }
				focus={ focus && 'venueTitle' === focus.editable ? focus : undefined }
				onFocus={ ( focusValue ) => setFocus( { editable: 'venueTitle', ...focusValue } ) }
				placeholder={ __( 'Venue', 'the-events-calendar' ) }
				formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
			/>
		)
	}

	render() {
		const { attributes, setAttributes, focus, setFocus } = this.props;
		const { eventVenue } = attributes;
		const venueContainer = (
			<VenueComponent
				focus={ ! eventVenue ? true : focus }
				addVenue={ next => {
					setAttributes( { eventVenueId: next.id, eventVenue: next } )
					let address = trim( `${next.meta._VenueAddress} ${next.meta._VenueCity} ${next.meta._VenueProvince} ${next.meta._VenueZip} ${next.meta._VenueCountry}` )
					this.map.updateAddress( address )
				} }
				removeVenue={ () => {
					setAttributes( { eventVenueId: null, eventVenue: null } )
					this.map.updateAddress( null )
				} }
			/>
		)
		let block = (
			<MetaGroup groupKey='event-venue-map' className='column-full-width'>
				{ this.renderTitle() }
				{ venueContainer }
			</MetaGroup>
		);

		if ( attributes.eventVenueId ) {
			const mapQuery = trim( `${eventVenue.meta._VenueAddress} ${eventVenue.meta._VenueCity} ${eventVenue.meta._VenueProvince} ${eventVenue.meta._VenueZip} ${eventVenue.meta._VenueCountry}` )
			const mapsUrlArgs = {
				f: 'q',
				source: 's_q',
				geocode: '',
				q: mapQuery,
			}
			const mapsUrl = `https://maps.google.com/maps?${ stringify( mapsUrlArgs ) }`

			block = (
				<div>
					<MetaGroup groupKey='event-venue-details' className='column-1-3'>
						{ this.renderTitle() }
						<h4>{ eventVenue.title.rendered }</h4>
						{ ! isEmpty( mapQuery ) &&
							<address className="tribe-events-address">
								<span className="tribe-street-address">{ eventVenue.meta._VenueAddress }</span>
								<br />
								<span className="tribe-locality">{ eventVenue.meta._VenueCity }</span><span className="tribe-delimiter">,</span>&nbsp;
								<abbr className="tribe-region tribe-events-abbr" title={ eventVenue.meta._VenueProvince }>{ eventVenue.meta._VenueProvince }</abbr>&nbsp;
								<span className="tribe-postal-code">{ eventVenue.meta._VenueZip }</span>&nbsp;
								<span className="tribe-country-name">{ eventVenue.meta._VenueCountry }</span>&nbsp;
								{ ! isEmpty( mapQuery ) &&
									<a
										className="tribe-events-gmap"
										href={ mapsUrl }
										title={ __( 'Click to view a Google Map', 'the-events-calendar' ) }
										target="_blank"
									>
										{ __( '+ Google Map', 'the-events-calendar' ) }
									</a>
								}
							</address>
						}
						{ venueContainer }
					</MetaGroup>
					<MetaGroup groupKey='event-venue-map' className='column-2-3'>
						<MapContainer
							ref="map"
							onRef={ ref => ( this.map = ref ) }
							address={ mapQuery }
						/>
					</MetaGroup>
				</div>
			)
		}

		const content = (
			<div key="event-venue-box" className="tribe-editor-block tribe-editor-event__venue">
				{ block }
			</div>
		)

		return content
	}
}

export default EventVenue;
