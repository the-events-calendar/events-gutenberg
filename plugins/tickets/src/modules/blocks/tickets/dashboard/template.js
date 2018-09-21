/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import TicketsActionDashboard from '@moderntribe/tickets/blocks/tickets/action-dashboard/template';
import TicketsSettingsDashboard from '@moderntribe/tickets/blocks/tickets/settings/template';

const TicketsDashboard = ( { isSelected, isSettingsOpen } ) => ( isSelected && (
	isSettingsOpen ? <TicketsSettingsDashboard /> : <TicketsActionDashboard />
) );

TicketsDashboard.propTypes = {
	isSelected: PropTypes.bool.isRequired,
	isSettingsOpen: PropTypes.bool.isRequired,
};

export default TicketsDashboard;
