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
import EventVenue from './block'

/**
 * Module Code
 */
export default {
	id: 'event-venue',
	title: __( 'Event Venue', 'the-events-calendar' ),
	description: __( 'Configuration for the Event Venue', 'the-events-calendar' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'the-events-calendar', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		venueTitle: {
			type: 'html',
		},
		eventVenueId: {
			type: 'integer',
			source: 'meta',
			meta: '_EventVenueID',
		},
	},

	useOnce: true,

	edit: EventVenue,

	save( props ) {
		return null;
	}
};

