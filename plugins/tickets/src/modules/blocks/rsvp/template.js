/**
 * External dependencies
 */
import React, { Fragment } from 'react';
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
import { ActionDashboard, InactiveBlock } from '@moderntribe/tickets/elements';
import { RSVP as RSVPLayout } from '@moderntribe/tickets/elements/inactive-block/element';
import { RSVPInactive } from '@moderntribe/tickets/icons';
import './style.pcss';

const inactiveBlockData = {
	icon: (
		<Fragment>
			<RSVPInactive />
			<span className="tribe-editor__rsvp__inactive-block-icon-label">
				{ __( 'RSVP', 'events-gutenberg' ) }
			</span>
		</Fragment>
	),
	title: __( 'No Active RSVP', 'events-gutenberg' ),
	/* eslint-disable-next-line max-len */
	description: __( 'The time is curently outside of the RSVP window. Make adjustments to the start and end date to activate this RSVP.', 'events-gutenberg' ),
	className: 'tribe-editor__rsvp__inactive-block',
	layout: RSVPLayout,
};

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
			<InactiveBlock { ...inactiveBlockData } />
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
