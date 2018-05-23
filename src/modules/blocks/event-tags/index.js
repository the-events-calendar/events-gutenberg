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

/**
 * Module Code
 */
export default {
	id: 'event-tags',
	title: __( 'Event Tags', 'events-gutenberg' ),
	description: __( 'Display your Event Tags.', 'events-gutenberg' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {

	},

	useOnce: true,
	edit: EventTags,
	save( props ) {
		return null;
	},
};

