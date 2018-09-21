/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ActionDashboard } from '@moderntribe/tickets/elements';
import {
	SettingsActionButton,
	AttendeesActionButton,
	OrdersActionButton,
} from '@moderntribe/tickets/blocks/tickets/action-buttons';

const actions = [
	<SettingsActionButton />,
	<AttendeesActionButton />,
	<OrdersActionButton />,
];

const confirmLabel = ( created ) => (
	created
		? __( 'Update Ticket', 'events-gutenberg' )
		: __( 'Create Ticket', 'events-gutenberg' )
);

const TicketsDashboardAction = ( { created } ) => (
	<ActionDashboard
		actions={ actions }
		confirmLabel={ confirmLabel( created ) }
	/>
);

TicketsDashboardAction.propTypes = {
	created: PropTypes.bool,
};

export default TicketsDashboardAction;
