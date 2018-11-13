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
		'Add recurrence rules to generate a series of events.',
		'events-gutenberg'
	),
	icon: BlockIcon,
	category: 'tribe-events',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	parent: [ 'tribe/event-pro-recurrence' ],

	supports: {
		html: false,
	},

	edit: EventRecurring,

	save( props ) {
		return null;
	},
};
