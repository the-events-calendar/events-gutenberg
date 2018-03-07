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
	title: __( 'Event Subtitle Classic', 'the-events-calendar' ),
	description: __( 'The classic single event subtitle shows date, time, and price.', 'the-events-calendar' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'the-events-calendar', 'tribe' ],

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
		}
	},

	useOnce: true,

	edit: EventSubtitle,

	save( props ) {
		return null;
	}
};
