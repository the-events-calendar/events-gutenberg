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
	title: __( 'Event Details', 'the-events-calendar' ),
	description: __( 'Configuration for the Event', 'the-events-calendar' ),
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
		detailsTitle: {
			type: 'html',
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
		}
	},

	useOnce: true,

	edit: EventDetails,

	save( props ) {
		return null;
	}
};

