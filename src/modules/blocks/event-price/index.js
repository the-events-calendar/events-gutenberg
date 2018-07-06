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
import { Icons } from 'elements';
import { withStore } from 'editor/hoc';

/**
 * Module Code
 */
export default {
	id: 'event-price',
	title: __( 'Event Price', 'events-gutenberg' ),
	description: __( 'Let visitors know the cost of this event or if it’s free to attend.', 'events-gutenberg' ),
	icon: Icons.TEC,
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
			default: '',
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
	edit: withStore()( EventPrice ),
	save( props ) {
		return null;
	},
};
