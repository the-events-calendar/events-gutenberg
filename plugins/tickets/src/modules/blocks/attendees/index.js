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
import Attendees from './container';
import { BlockIcon } from '@moderntribe/common/elements';

/**
 * Module Code
 */
export default {
	id: 'attendees',
	title: __( 'Event Attendees', 'events-gutenberg' ),
	description: __(
		'Show the gravatars of people coming to this event.',
		'events-gutenberg'
	),
	icon: BlockIcon,
	category: 'tribe-tickets',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		title: {
			type: 'html',
			default: __( 'Who\'s Attending?', 'events-gutenberg' ),
		},
	},

	edit: Attendees,

	save: () => null,
};
