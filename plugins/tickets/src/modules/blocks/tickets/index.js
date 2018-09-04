/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlockIcon } from '@moderntribe/common/elements';
import { TicketActive } from '@moderntribe/tickets/icons';
import DisabledTickets from './DisabledTickets';

const disabled = {
	title: __( 'No Active Tickets', 'events-gutenberg' ),
	description: __(
		'The time is curently outside of the ticket sales window. Make adjustments to the start and end date to activate these tickets.',
		'events-gutenberg'
	),
}

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
			<DisabledTickets title={ disabled.title }>
				{ disabled.description }
			</DisabledTickets>
		</div>
	),

	save: () => null,
};
