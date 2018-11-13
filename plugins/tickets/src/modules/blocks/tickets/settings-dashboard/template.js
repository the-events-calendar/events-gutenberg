/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Wordpress dependencies
 */
import { Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { SettingsDashboard } from '@moderntribe/tickets/elements';
import CapacityTable from '@moderntribe/tickets/blocks/tickets/capacity-table/container';
import HeaderImage from '@moderntribe/tickets/blocks/tickets/header-image/container';

const TicketsSettingsDashboard = ( { isSettingsLoading, onCloseClick } ) => (
	<SettingsDashboard
		className={ classNames(
			'tribe-editor__tickets__settings-dashboard',
			{ 'tribe-editor__tickets__settings-dashboard--loading': isSettingsLoading },
		) }
		closeButtonDisabled={ isSettingsLoading }
		content={ (
			<Fragment>
				<CapacityTable />
				<HeaderImage />
				{ isSettingsLoading && <Spinner /> }
			</Fragment>
		) }
		onCloseClick={ onCloseClick }
	/>
);

TicketsSettingsDashboard.propTypes = {
	isSettingsLoading: PropTypes.bool.isRequired,
	onCloseClick: PropTypes.func.isRequired,
};

export default TicketsSettingsDashboard;