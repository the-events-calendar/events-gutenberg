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
import { BlockIcon } from '@moderntribe/common/elements';

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
	icon: BlockIcon,
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
