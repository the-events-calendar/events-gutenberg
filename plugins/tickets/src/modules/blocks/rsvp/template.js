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
import { ActionDashboard } from '@moderntribe/tickets/elements';
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

	return (
		<div className={ classNames(
			'tribe-editor__rsvp',
			{ 'tribe-editor__rsvp--selected': isSelected },
		) }>
			<RSVPContainer isSelected={ isSelected } />
			{ getActionDashboard() }
		</div>
	);
};

RSVP.propTypes = {
	created: PropTypes.bool.isRequired,
	isSelected: PropTypes.bool.isRequired,
};

export default RSVP;
