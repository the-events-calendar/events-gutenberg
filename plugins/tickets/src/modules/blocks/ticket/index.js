/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { BlockIcon } from '@moderntribe/common/elements';
import Ticket from './container';

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

	attributes: {
	},
	edit: Ticket,
	save: () => <div><InnerBlocks.Content /></div>,
};
