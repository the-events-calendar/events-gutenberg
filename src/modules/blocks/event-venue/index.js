/**
 * External dependencies
 */
import { pick } from 'lodash';

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
	description: __( 'Where is this event happening? Select or create a location.', 'events-gutenberg' ),
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

	edit: ( { attributes, ...rest } ) => {
		const properties = {
			...attributes,
			...pick( rest, [ 'setAttributes', 'isSelected' ] ),
			loading: !! attributes.venue,
		};

		return (
			<EventVenue { ...properties } />
		);
	},

	save( props ) {
		return null;
	},
};

