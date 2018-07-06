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
import withStore from 'editor/hoc/with-store';
import EventWebsite from './block';
import { Icons } from 'elements';

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
	icon: Icons.TEC,
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		urlLabel: {
			type: 'html',
			default: '',
		},
		url: {
			type: 'string',
			source: 'meta',
			meta: '_EventURL',
		},
	},

	edit: withStore()( EventWebsite ),

	save( props ) {
		return null;
	},
};

