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
import EventSubtitle from './block'

/**
 * Module Code
 */
export default {
	id: 'event-subtitle',
	title: __( 'Event Subtitle Classic', 'events-gutenberg' ),
	description: __( 'The classic single event subtitle shows date, time, and price.', 'events-gutenberg' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
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
		allDay: {
			type: 'boolean',
			source: 'meta',
			meta: '_EventAllDay',
		},
		timezone: {
			type: 'string',
			source: 'meta',
			meta: '_EventTimezone',
		}
	},

	useOnce: true,

	edit: EventSubtitle,

	save( props ) {
		return null;
	}
};
