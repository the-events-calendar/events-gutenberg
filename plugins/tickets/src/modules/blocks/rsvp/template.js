/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import RSVPContainer from './rsvp-container/template';
import { ActionDashboard } from '@moderntribe/tickets/elements';
import './style.pcss';

const RSVP = ( {
	created,
	isSelected,
} ) => {
	const getActionDashboard = () => {
		const actions = [ 'test-1', 'test-2' ];
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
		<div className="tribe-editor__rsvp">
			<RSVPContainer showContent={ isSelected } />
			{ getActionDashboard() }
		</div>
	);
};

RSVP.propTypes = {
	created: PropTypes.bool.isRequired,
	isSelected: PropTypes.bool.isRequired,
};

export default RSVP;
