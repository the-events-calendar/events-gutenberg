/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Wordpress dependencies
 */
import { Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import TicketsActionDashboard from '@moderntribe/tickets/blocks/tickets/action-dashboard/container';
import TicketsSettingsDashboard from '@moderntribe/tickets/blocks/tickets/settings/container';

const TicketsDashboard = ( props ) => {
	const { isLoading, isSelected, isSettingsOpen, activeBlockId, isEditing, clientId } = props;

	if ( isLoading ) {
		return (
			<Fragment>
				<div className="tribe-editor__tickets-container--loading">
					<Spinner />
				</div>
			</Fragment>
		);
	}

	if ( ! isSelected ) {
		return null;
	}

	return ( isSettingsOpen
		? <TicketsSettingsDashboard />
		: (
			<TicketsActionDashboard
				activeBlockId={ activeBlockId }
				isEditing={ isEditing }
				clientId={ clientId }
			/>
		) );
}

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
