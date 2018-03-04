/**
 * External dependencies
 */
import moment from 'moment';
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

		this.state = {
			venueCoordinates: undefined,
			venue: undefined,
		}
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
		const { eventVenueId } = attributes;
		const venueContainer = (
			<VenueComponent
				ref='venue'
				onRef={ ref => ( this.venue = ref ) }
				focus={ ! eventVenueId ? true : focus }
				addVenue={ next => {
					const coordinates = { lng: parseFloat( next.meta._VenueLng ), lat: parseFloat( next.meta._VenueLat ) }
					setAttributes( { eventVenueId: next.id } )
					this.setState( { venueCoordinates: coordinates, venue: next } )
				} }
				removeVenue={ () => {
					setAttributes( { eventVenueId: undefined } )
					this.setState( { venueCoordinates: undefined, venue: undefined } )
				} }
			/>
		)

		let block = (
			<MetaGroup groupKey='event-venue-map' className='column-full-width'>
				{ this.renderTitle() }
				{ venueContainer }
			</MetaGroup>
		);

		if ( eventVenueId ) {
			const { venueCoordinates, coordinates } = this.state

			block = (
				<div>
					<MetaGroup groupKey='event-venue-details' className='column-1-3'>
						{ this.renderTitle() }
						{ venueContainer }
					</MetaGroup>
					<MetaGroup groupKey='event-venue-map' className='column-2-3'>
						<MapContainer
							key={ `venue-map-${ eventVenueId }` }
							address={ () => this.venue.getAddress() }
							coordinates={ this.state.venueCoordinates }
							onCoordinatesChange={ ( coordinates ) => this.setState( { venueCoordinates: coordinates } ) }
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
