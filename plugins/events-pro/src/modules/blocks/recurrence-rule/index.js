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
import EventRecurring from './container';
import { TEC } from '@moderntribe/common/icons';

/**
 * Module Code
 */

export default {
	id: 'event-pro-recurrence-rule',
	title: __( 'Rules', 'events-gutenberg' ),
	description: __(
		'Add recurrence to your event.',
		'events-gutenberg'
	),
	icon: TEC,
	category: 'tribe-events',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	parent: [ 'tribe/event-pro-recurrence' ],

	supports: {
		html: false,
	},

	attributes: {
		rules: {
			type: 'string',
			source: 'meta',
			meta: '_tribe_blocks_recurrence_rules',
		},
	},

	edit: EventRecurring,

	save( props ) {
		return null;
	},
};
