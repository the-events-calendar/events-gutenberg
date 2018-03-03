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
					setAttributes( { eventVenueId: next.id } )
					this.map.updateAddress( this.venue.getAddress( next ) )
				} }
				removeVenue={ () => {
					setAttributes( { eventVenueId: null } )
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

		if ( eventVenueId ) {
			block = (
				<div>
					<MetaGroup groupKey='event-venue-details' className='column-1-3'>
						{ this.renderTitle() }
						{ venueContainer }
					</MetaGroup>
					<MetaGroup groupKey='event-venue-map' className='column-2-3'>
						<MapContainer
							ref="map"
							onRef={ ref => ( this.map = ref ) }
							address={ () => this.venue.getAddress() }
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
