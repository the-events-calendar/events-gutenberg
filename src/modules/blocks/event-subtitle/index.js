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
	title: __( 'Event Subtitle', 'the-events-calendar' ),
	description: __( 'Configuration for the Event Date Time', 'the-events-calendar' ),
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

