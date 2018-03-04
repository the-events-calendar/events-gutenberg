/**
 * External dependencies
 */
import moment from 'moment';
import { union, without } from 'lodash';

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
	TermsList,
	OrganizerForm,
	DateTime,
	MetaGroup,
} from 'elements'

import { default as EventOrganizers } from './organizers'

/**
 * Module Code
 */

class EventDetails extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { attributes, setAttributes, focus, setFocus } = this.props;

		const content = (
			<div key="event-details-box" className="tribe-editor-block tribe-editor-event__details">
				<MetaGroup groupKey='event-details'>
					<RichText
						tagName="h3"
						className="tribe-events-single-section-title"
						value={ attributes.detailsTitle }
						onChange={ ( nextContent ) => {
							if ( ! nextContent ) {
								nextContent = __( 'Details', 'the-events-calendar' );
							}

							setAttributes( {
								detailsTitle: nextContent
							} );
						} }
						focus={ focus && 'detailsTitle' === focus.editable ? focus : undefined }
						onFocus={ ( focusValue ) => setFocus( { editable: 'detailsTitle', ...focusValue } ) }
						placeholder={ __( 'Details', 'the-events-calendar' ) }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
					/>

					<DateTime
						changeDatetime={ ( date ) => setAttributes( { startDate: date } ) }
						datetime={ attributes.startDate }
						label={ __( 'Start: ', 'the-events-calendar' ) }
					/>

					<DateTime
						changeDatetime={ ( date ) => setAttributes( { endDate: date } ) }
						datetime={ attributes.endDate }
						label={ __( 'End: ', 'the-events-calendar' ) }
					/>

					<div>
						<strong>Website: </strong>
						<PlainText
							id="tribe-event-url"
							value={ attributes.eventUrl }
							placeholder={ __( 'Write event website here…', 'the-events-calendar' ) }
							onChange={ ( nextContent ) => setAttributes( { eventUrl: nextContent } ) }
						/>
					</div>

					<TermsList
						slug="tribe_events_cat"
						label={ __( 'Event Category:', 'the-events-calendar' ) }
					/>

					<TermsList
						slug="tags"
						label={ __( 'Event Tags:', 'the-events-calendar' ) }
					/>
				</MetaGroup>
				<MetaGroup groupKey='organizer'>
					<RichText
						tagName="h3"
						className="tribe-events-single-section-title"
						value={ attributes.organizerTitle }
						onChange={ ( nextContent ) => setAttributes( { organizerTitle: nextContent } ) }
						focus={ focus && 'organizerTitle' === focus.editable ? focus : undefined }
						onFocus={ ( focusValue ) => setFocus( { editable: 'organizerTitle', ...focusValue } ) }
						placeholder={ __( 'Organizer', 'the-events-calendar' ) }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
					/>

					<EventOrganizers
						focus={ focus }
						addOrganizer={ nextOrganizer => setAttributes( { eventOrganizers: union( attributes.eventOrganizers, [ nextOrganizer.id ] ) } ) }
						removeOrganizer={ organizer => setAttributes( { eventOrganizers: without( attributes.eventOrganizers, organizer.id ) } ) }
					/>
				</MetaGroup>
			</div>
		)

		return content
	}
}

export default EventDetails;
