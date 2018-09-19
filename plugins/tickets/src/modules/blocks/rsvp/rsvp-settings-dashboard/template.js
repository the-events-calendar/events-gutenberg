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
import ImageUpload from '@moderntribe/common/elements/image-upload/element';
import RSVPHeaderImage from '@moderntribe/tickets/blocks/rsvp/rsvp-header-image/container';
import { SettingsDashboard } from '@moderntribe/tickets/elements';

const RSVPSettingsDashboard = ( { onCloseClick } ) => (
	<SettingsDashboard
		className="tribe-editor__rsvp__settings-dashboard"
		content={ <RSVPHeaderImage /> }
		onCloseClick={ onCloseClick }
	/>
);

RSVPSettingsDashboard.propTypes = {
	onCloseClick: PropTypes.func.isRequired,
};

export default RSVPSettingsDashboard;
