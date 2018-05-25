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
import EventWebsite from './block';

/**
 * Module Code
 */
export default {
	id: 'event-website',
	title: __( 'Event Website', 'events-gutenberg' ),
	description: __(
		'Display a button to control the Event Website link.',
		'events-gutenberg'
	),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		label: {
			type: 'html',
		},
		eventUrl: {
			type: 'string',
			source: 'meta',
			meta: '_EventURL',
		},
	},

	useOnce: true,

	edit: EventWebsite,

	save( props ) {
		return null;
	},
};

