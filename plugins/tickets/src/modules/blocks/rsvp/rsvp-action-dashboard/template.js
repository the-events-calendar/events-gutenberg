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
import {
	SettingsActionButton,
	AttendeesActionButton,
} from '@moderntribe/tickets/blocks/rsvp/rsvp-action-buttons';
import { ActionDashboard } from '@moderntribe/tickets/elements';

const RSVPActionDashboard = ( { created } ) => {
	const actions = [
		<SettingsActionButton />,
		<AttendeesActionButton />,
	];

	const confirmLabel = created
		? __( 'Update RSVP', 'events-gutenberg' )
		: __( 'Create RSVP', 'events-gutenberg' );

	const cancelLabel = __( 'Cancel', 'events-gutenberg' );

	return (
		<ActionDashboard
			className="tribe-editor__rsvp__action-dashboard"
			actions={ actions }
			cancelLabel={ cancelLabel }
			confirmLabel={ confirmLabel }
		/>
	);
};

RSVPActionDashboard.propTypes = {
	created: PropTypes.bool.isRequired,
};

export default RSVPActionDashboard;
