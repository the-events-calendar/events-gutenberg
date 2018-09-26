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

const TicketsDashboardAction = ( props ) => {
	const { onConfirmClick, isEditing, created, isEditFormValid, isVolatile, onCancelClick } = props;

	const dashboardProps = {
		actions: isEditing ? [] : actions,
		confirmLabel: __( 'Add Tickets', 'events-gutenberg' ),
		onConfirmClick,
		onCancelClick,
	};

	if ( isEditing ) {
		dashboardProps.isConfirmDisabled = ! isEditFormValid;
		dashboardProps.cancelLabel = __( 'Cancel', 'events-gutenberg' );
		dashboardProps.confirmLabel = confirmLabel( ! isVolatile );
	}

	return (
		<ActionDashboard { ...dashboardProps } />
	);
}

TicketsDashboardAction.propTypes = {
	created: PropTypes.bool,
	isEditing: PropTypes.bool,
	isEditFormValid: PropTypes.bool,
	activeBlockId: PropTypes.string,
	isVolatile: PropTypes.bool,
};

export default TicketsDashboardAction;
