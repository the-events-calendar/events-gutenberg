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
import { SettingsDashboard } from '@moderntribe/tickets/elements';

const RSVPSettingsDashboard = ( { onCloseClick, onSelect } ) => {
	const imageUploadProps = {
		title: __( 'Ticket Header Image', 'events-gutenberg' ),
		description: __(
			/* eslint-disable-next-line max-len */
			'Select an image from your Media Library to display on emailed tickets. For best results, use a .jpg, .png, or .gif at least 1160px wide.',
			'events-gutenberg'
		),
		buttonLabel: __( 'Upload Image', 'events-gutenberg' ),
		onSelect: onSelect,
	};

	return (
		<SettingsDashboard
			className="tribe-editor__rsvp__settings-dashboard"
			content={ <ImageUpload { ...imageUploadProps } /> }
			onCloseClick={ onCloseClick }
		/>
	);
};

RSVPSettingsDashboard.propTypes = {
	onCloseClick: PropTypes.func.isRequired,
};

export default RSVPSettingsDashboard;
