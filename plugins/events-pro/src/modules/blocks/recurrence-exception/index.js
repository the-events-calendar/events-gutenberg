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
import EventException from './container';
import { Icons } from '@moderntribe/events/elements';

/**
 * Module Code
 */

export default {
	id: 'event-pro-recurrence-exception',
	title: __( 'Exception', 'events-gutenberg' ),
	description: __(
		'Add exceptions to your event.',
		'events-gutenberg'
	),
	icon: Icons.TEC,
	category: 'tribe-events',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	parent: [ 'tribe/event-pro-recurrence' ],

	supports: {
		html: false,
	},

	attributes: {
	},

	edit: EventException,

	save( props ) {
		return null;
	},
};
