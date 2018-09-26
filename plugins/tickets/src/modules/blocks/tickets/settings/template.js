/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { SettingsDashboard } from '@moderntribe/tickets/elements';
import CapacityTable from '@moderntribe/tickets/blocks/tickets/capacity-table/container';
import TicketImage from './../header-image/container';

const TicketsSettingsDashboard = ( { onCloseClick, content } ) => (
	<SettingsDashboard
		className="tribe-editor__tickets__settings-dashboard"
		content={ content }
		onCloseClick={ onCloseClick }
	/>
);

TicketsSettingsDashboard.propTypes = {
	onCloseClick: PropTypes.func.isRequired,
	content: PropTypes.node,
};

TicketsSettingsDashboard.defaultProps = {
	onCloseClick: noop,
	content: (
		<Fragment>
			<CapacityTable />
			<TicketImage />
		</Fragment>
	),
}

export default TicketsSettingsDashboard;
