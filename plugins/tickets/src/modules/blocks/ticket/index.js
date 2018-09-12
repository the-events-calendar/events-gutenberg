/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlockIcon } from '@moderntribe/common/elements';

export default {
	id: 'event-tickets-ticket',
	title: __( 'Event Ticket', 'events-gutenberg' ),
	description: __( 'Entry for ticket', 'events-gutenberg' ),
	icon: BlockIcon,
	category: 'tribe-tickets',
	keywords: [ 'event', 'events-tickets', 'tribe' ],

	parent: [ 'tribe/event-tickets' ],

	supports: {
		html: false,
	},

	attributes: {},
	
	edit: ( { clientId })  => <div>Ticket { clientId }</div>,
	save: () => null,
};
