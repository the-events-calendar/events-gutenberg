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
		'Who is attending to this event? List them with their gravatar!',
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
