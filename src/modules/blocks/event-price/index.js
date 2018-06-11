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
import EventPrice from './block';

/**
 * Module Code
 */
export default {
	id: 'event-price',
	title: __( 'Event Price', 'events-gutenberg' ),
	description: __( 'Set your event’s price and price description.', 'events-gutenberg' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		cost: {
			type: 'string',
			source: 'meta',
			meta: '_EventCost',
		},
		costDescription: {
			type: 'html',
		},
		currencySymbol: {
			type: 'string',
			source: 'meta',
			meta: '_EventCurrencySymbol',
		},
		currencyPosition: {
			type: 'string',
			source: 'meta',
			meta: '_EventCurrencyPosition',
		},
	},

	useOnce: true,
	edit: EventPrice,
	save( props ) {
		return null;
	},
};

