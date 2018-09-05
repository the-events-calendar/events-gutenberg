/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlockIcon } from '@moderntribe/common/elements';
import DisabledTickets from './DisabledTickets';
import TicketIcon from './TicketIcon';
import { ActionDashboard } from '@moderntribe/tickets/elements';

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
	category: 'tribe-tickets',
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
			<TicketIcon disabled={ true } unlimited={ true } />
			<TicketIcon disabled={ false } unlimited={ true } />
			<TicketIcon />
			<TicketIcon disabled={ true } />
		</div>
	),

	save: () => null,
};
