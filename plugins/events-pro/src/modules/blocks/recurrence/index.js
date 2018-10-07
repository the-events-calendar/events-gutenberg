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
	id: 'event-pro-recurrence',
	title: __( 'Recurring', 'events-gutenberg' ),
	description: __(
		'Entry for recurrence',
		'events-gutenberg'
	),
	icon: TEC,
	category: 'tribe-events',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	parent: [ 'tribe/event-datetime' ],

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
