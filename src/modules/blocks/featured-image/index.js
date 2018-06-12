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
import FeaturedImage from './block';

/**
 * Module Code
 */
export default {
	id: 'featured-image',
	title: __( 'Featured Image', 'events-gutenberg' ),
	description: __( 'Display the featured image in the post content.', 'events-gutenberg' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {

	},

	useOnce: true,
	edit: FeaturedImage,
	save( props ) {
		return null;
	},
};

