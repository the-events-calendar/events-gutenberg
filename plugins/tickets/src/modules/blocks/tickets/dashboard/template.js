/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import TicketsActionDashboard from '@moderntribe/tickets/blocks/tickets/action-dashboard/container';
import TicketsSettingsDashboard from '@moderntribe/tickets/blocks/tickets/settings/container';

const TicketsDashboard = ( { isSelected, isSettingsOpen, activeBlockId, isEditing, clientId } ) => ( isSelected && (
	isSettingsOpen
		? <TicketsSettingsDashboard />
		: (
			<TicketsActionDashboard
				activeBlockId={ activeBlockId }
				isEditing={ isEditing }
				clientId={ clientId }
			/>
		)
) );

TicketsDashboard.propTypes = {
	isSelected: PropTypes.bool.isRequired,
	isEditing: PropTypes.bool,
	isSettingsOpen: PropTypes.bool.isRequired,
};

TicketsDashboard.defaultProps = {
	isSelected: false,
	isEditing: false,
}

export default TicketsDashboard;
