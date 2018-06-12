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
import EventWebsite from './block';

/**
 * Module Code
 */
export default {
	id: 'event-website',
	title: __( 'Event Website', 'events-gutenberg' ),
	description: __(
		'Is there another website for this event? Link to it with a button!',
		'events-gutenberg'
	),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		urlLabel: {
			type: 'html',
		},
		url: {
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

