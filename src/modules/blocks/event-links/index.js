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
import EventLinks from './block';

/**
 * Module Code
 */
export default {
	id: 'event-links',
	title: __( 'Event Sharing', 'events-gutenberg' ),
	description: __(
		'Encourage visitors to add your event to their calendars with handy sharing buttons.',
		'events-gutenberg'
	),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

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
	},
};

