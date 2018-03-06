/**
 * External dependencies
 */
import moment from 'moment';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Dropdown } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	PlainText,
} from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import {
	DateTime,
} from 'elements'

/**
 * Module Code
 */
class EventLinks extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { attributes, focus, setAttributes } = this.props;

		return (
			<div key="event-links" className="tribe-editor-block tribe-editor-events-link">
				<a
					className="tribe-events-gcal tribe-events-button"
					href="#gcal-link"
					title={ __( 'Add to Google Calendar', 'the-events-calendar' ) }
				>
					<PlainText
						id="tribe-event-url"
						value={ attributes.googleCalendarLabel }
						placeholder={ __( '+ Google Calendar', 'the-events-calendar' ) }
						onChange={ ( nextContent ) => setAttributes( { googleCalendarLabel: nextContent } ) }
					/>
				</a>
				<a
					className="tribe-events-ical tribe-events-button"
					href="#ical-export-link"
					title={ __( 'Download .ics file', 'the-events-calendar' ) }
				>
					<PlainText
						id="tribe-event-url"
						value={ attributes.icalExportLabel }
						placeholder={ __( '+ iCal Export', 'the-events-calendar' ) }
						onChange={ ( nextContent ) => setAttributes( { icalExportLabel: nextContent } ) }
					/>
				</a>
			</div>
		)
	}
}

export default EventLinks;
