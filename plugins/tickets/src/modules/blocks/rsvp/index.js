/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlockIcon } from '@moderntribe/common/elements';
import RSVP from './container';
import {
	KEY_TICKET_GOING_COUNT,
	KEY_TICKET_NOT_GOING_COUNT,
	KEY_TICKET_HEADER,
} from '@moderntribe/tickets/data/utils';

/**
 * Module Code
 */
export default {
	id: 'rsvp',
	title: __( 'RSVP', 'events-gutenberg' ),
	description: __(
		'Find out who is planning to attend!',
		'events-gutenberg',
	),
	icon: BlockIcon,
	category: 'tribe-tickets',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		goingCount: {
			type: 'integer',
			source: 'meta',
			meta: KEY_TICKET_GOING_COUNT,
		},
		notGoingCount: {
			type: 'integer',
			source: 'meta',
			meta: KEY_TICKET_NOT_GOING_COUNT,
		},
		headerImageId: {
			type: 'integer',
			source: 'meta',
			meta: KEY_TICKET_HEADER,
		},
	},

	edit: RSVP,

	save: () => null,
};
