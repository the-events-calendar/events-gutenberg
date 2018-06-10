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
import EventCategory from './block';

/**
 * Module Code
 */
export default {
	id: 'event-category',
	title: __( 'Event Category', 'events-gutenberg' ),
	description: __( 'Show assigned event categories as links to their respective archives.', 'events-gutenberg' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {

	},

	useOnce: true,
	edit: EventCategory,
	save( props ) {
		return null;
	},
};

