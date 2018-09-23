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
import { ImageUpload } from '@moderntribe/common/elements';
import CapacityTable from '@moderntribe/tickets/blocks/tickets/capacity-table/container';

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

const imageUploadProps = {
	title: __( 'Ticket Header Image', 'events-gutenberg' ),
	description: __(
		/* eslint-disable-next-line max-len */
		'Select an image from your Media Library to display on emailed tickets. For best results, use a .jpg, .png, or .gif at least 1160px wide.',
		'events-gutenberg'
	),
	buttonLabel: __( 'Upload Image', 'events-gutenberg' ),
};

TicketsSettingsDashboard.defaultProps = {
	onCloseClick: noop,
	content: (
		<Fragment>
			<CapacityTable />
			<ImageUpload { ...imageUploadProps } />
		</Fragment>
	),
}

export default TicketsSettingsDashboard;
