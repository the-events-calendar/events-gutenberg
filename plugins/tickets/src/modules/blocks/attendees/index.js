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

// @todo: this SVG is acting weird, so, commenting it out for now
//import { Attendees as AttendeesIcon } from '@moderntribe/tickets/icons';
import { TEC as AttendeesIcon } from '@moderntribe/common/icons';

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
	icon: <AttendeesIcon/>,
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
