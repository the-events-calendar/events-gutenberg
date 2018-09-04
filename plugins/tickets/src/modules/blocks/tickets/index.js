/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlockIcon } from '@moderntribe/common/elements';
import { TicketActive } from '@moderntribe/tickets/icons';

/**
 * Module Code
 */
export default {
	id: 'event-tickets',
	title: __( 'Event Tickets', 'events-gutenberg' ),
	description: __(
		'Basic ticket functionality',
		'events-gutenberg',
	),
	icon: BlockIcon,
	category: 'tribe-events',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {},

	edit: () => (
		<div>
			<TicketActive /> Event Tickets Placeholder
		</div>
	),

	save: () => null,
};
