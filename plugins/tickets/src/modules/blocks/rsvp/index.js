/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlockIcon } from '@moderntribe/common/elements';
import RSVP from './container';
import { KEY_TICKET_HEADER } from '@moderntribe/tickets/data/utils';

/**
 * Module Code
 */
export default {
	id: 'event-rsvp',
	title: __( 'RSVP', 'events-gutenberg' ),
	description: __(
		'RSVP block',
		'events-gutenberg',
	),
	icon: BlockIcon,
	category: 'tribe-tickets',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		ticketHeader: {
			type: 'integer',
			source: 'meta',
			_meta: KEY_TICKET_HEADER,
		},
	},

	edit: RSVP,

	save: () => null,
};
