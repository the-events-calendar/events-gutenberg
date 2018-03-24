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
import EventDetails from './block'

/**
 * Module Code
 */
export default {
	id: 'event-details',
	title: __( 'Event Details Classic', 'the-events-calendar' ),
	description: __( 'Set your event’s date and time. You can also add price, event website, and organizers.', 'the-events-calendar' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'the-events-calendar', 'tribe' ],

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
		eventCost: {
			type: 'string',
			source: 'meta',
			meta: '_EventCost',
		},
		eventCurrencySymbol: {
			type: 'string',
			source: 'meta',
			meta: '_EventCurrencySymbol',
		},
		eventCurrencyPosition: {
			type: 'string',
			source: 'meta',
			meta: '_EventCurrencyPosition',
		},
	},

	useOnce: true,

	edit: EventDetails,

	save( props ) {
		return null;
	}
};

