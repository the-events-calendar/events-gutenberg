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
import EventTags from './block';
import { Icons } from '@@tribe/events/elements';

/**
 * Module Code
 */
export default {
	id: 'event-tags',
	title: __( 'Event Tags', 'events-gutenberg' ),
	description: __( 'Add keywords by displaying linked tags.', 'events-gutenberg' ),
	icon: Icons.TEC,
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {

	},
	edit: EventTags,
	save( props ) {
		return null;
	},
};

