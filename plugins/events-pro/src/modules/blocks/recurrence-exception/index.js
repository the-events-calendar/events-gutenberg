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
import { TEC } from '@moderntribe/common/icons';

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
	icon: TEC,
	category: 'tribe-events',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	parent: [ 'tribe/event-pro-recurrence' ],

	supports: {
		html: false,
	},

	attributes: {
		exceptions: {
			type: 'string',
			source: 'meta',
			meta: '_tribe_blocks_recurrence_exclusions',
		},
	},

	edit: EventException,

	save( props ) {
		return null;
	},
};
