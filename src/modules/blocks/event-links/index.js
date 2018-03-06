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
	title: __( 'Event Links', 'the-events-calendar' ),
	description: __( 'Configuration for the Event Links', 'the-events-calendar' ),
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

