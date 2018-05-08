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
import EventDetails from './block';

/**
 * Module Code
 */
export default {
	id: 'event-details',
	title: __( 'Event Details Classic', 'events-gutenberg' ),
	description: __( 'Set your event’s date and time. You can also add price, event website, and organizers.', 'events-gutenberg' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		organizerTitle: {
			type: 'html',
		},
		eventOrganizers: {
			type: 'array',
			source: 'meta',
			meta: '_EventOrganizerID',
		},
		detailsTitle: {
			type: 'html',
		},
		allDay: {
			type: 'boolean',
			source: 'meta',
			meta: '_EventAllDay',
		},
		startDate: {
			type: 'string',
			source: 'meta',
			meta: '_EventStartDate',
		},
		endDate: {
			type: 'string',
			source: 'meta',
			meta: '_EventEndDate',
		},
		eventUrl: {
			type: 'string',
			source: 'meta',
			meta: '_EventURL',
		},
	},

	useOnce: true,

	edit: EventDetails,

	save( props ) {
		return null;
	},
};

