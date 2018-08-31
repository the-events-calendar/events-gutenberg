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
import { Icons } from '@moderntribe/events/elements';

/**
 * Module Code
 */

export default {
	id: 'event-pro-recurring',
	title: __( 'Rules', 'events-gutenberg' ),
	description: __(
		'Add recurrence to your event.',
		'events-gutenberg'
	),
	icon: Icons.TEC,
	category: 'tribe-events',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	parent: [ 'tribe/event-pro-recurring-entry' ],

	supports: {
		html: false,
	},

	attributes: {
	},

	edit: EventRecurring,

	save( props ) {
		return null;
	},
};
