/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import EventLinks from './block'

/**
 * Module Code
 */
export default {
	id: 'event-links',
	title: __( 'Event Sharing', 'the-events-calendar' ),
	description: __( 'Display buttons so visitors can add this event to their calendar.', 'the-events-calendar' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'the-events-calendar', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		googleCalendarLabel: {
			type: 'html',
		},
		icalExportLabel: {
			type: 'html',
		},
	},

	useOnce: true,

	edit: EventLinks,

	save( props ) {
		return null;
	}
};

