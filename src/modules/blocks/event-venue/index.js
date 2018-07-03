/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import EventVenue from './block';
import withStore from 'editor/hoc/with-store';
import { Icons } from 'elements';

/**
 * Module Code
 */
export default {
	id: 'event-venue',
	title: __( 'Event Location', 'events-gutenberg' ),
	description: __( 'Where is this event happening? Select or create a location.', 'events-gutenberg' ),
	icon: Icons.TEC,
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		venueTitle: {
			type: 'html',
		},
		venue: {
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

	edit: withStore( EventVenue ),

	save( props ) {
		return null;
	},
};

