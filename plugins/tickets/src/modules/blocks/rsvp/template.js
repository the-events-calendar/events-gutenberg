/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import RSVPContainer from './rsvp-container/template';
import {
	SettingsActionButton,
	AttendeesActionButton,
} from './rsvp-action-buttons';
import { ImageUpload } from '@moderntribe/common/elements';
import { ActionDashboard, SettingsDashboard } from '@moderntribe/tickets/elements';
import './style.pcss';

const RSVP = ( {
	created,
	isSelected,
} ) => {
	const getActionDashboard = () => {
		const actions = [
			<SettingsActionButton />,
			<AttendeesActionButton />,
		];
		const confirmLabel = created
			? __( 'Update RSVP', 'events-gutenberg' )
			: __( 'Create RSVP', 'events-gutenberg' );
		const cancelLabel = __( 'Cancel', 'events-gutenberg' );

		return isSelected && (
			<ActionDashboard
				actions={ actions }
				cancelLabel={ cancelLabel }
				confirmLabel={ confirmLabel }
			/>
		);
	};

	const getSettingsDashboard = () => {
		const imageUploadProps = {
			title: __( 'Ticket Header Image', 'events-gutenberg' ),
			description: __(
				/* eslint-disable-next-line max-len */
				'Select an image from your Media Library to display on emailed tickets. For best results, use a .jpg, .png, or .gif at least 1160px wide.',
				'events-gutenberg'
			),
			buttonLabel: __( 'Upload Image', 'events-gutenberg' ),
		};

		return isSelected && (
			<SettingsDashboard
				className="tribe-editor__rsvp__settings-dashboard"
				content={ <ImageUpload { ...imageUploadProps } /> }
			/>
		);
	};

	return (
		<div className={ classNames(
			'tribe-editor__rsvp',
			{ 'tribe-editor__rsvp--selected': isSelected },
		) }>
			<RSVPContainer isSelected={ isSelected } />
			{ getActionDashboard() }
			{ getSettingsDashboard() }
		</div>
	);
};

RSVP.propTypes = {
	created: PropTypes.bool.isRequired,
	isSelected: PropTypes.bool.isRequired,
};

export default RSVP;
