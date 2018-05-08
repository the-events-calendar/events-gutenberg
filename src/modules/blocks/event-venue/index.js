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
import EventVenue from './block';

/**
 * Module Code
 */
export default {
	id: 'event-venue',
	title: __( 'Event Location', 'events-gutenberg' ),
	description: __( 'Indicate where the event takes place.', 'events-gutenberg' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

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
		showMapLink: {
			type: 'boolean',
			source: 'meta',
			meta: '_EventShowMapLink',
		},
		showMap: {
			type: 'boolean',
			source: 'meta',
			meta: '_EventShowMap',
		},
	},

	useOnce: true,

	edit: EventVenue,

	save( props ) {
		return null;
	},
};

