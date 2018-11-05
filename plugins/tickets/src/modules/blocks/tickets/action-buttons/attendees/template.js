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
import { ActionButton } from '@moderntribe/tickets/elements';
// @todo: attendee SVG is loading weird, so, not using this icon yet
// import { RSVP } from '@moderntribe/tickets/icons';
import { User as RSVP } from '@moderntribe/common/src/modules/icons';

const AttendeesActionButton = ( { href, hasProviders } ) => ( hasProviders && (
	<ActionButton
		asLink={ true }
		href={ href }
		icon={ <RSVP /> }
		target="_blank"
	>
		{ __( 'Attendees', 'events-gutenberg' ) }
	</ActionButton>
) );

AttendeesActionButton.propTypes = {
	href: PropTypes.string.isRequired,
	hasProviders: PropTypes.bool,
};

export default AttendeesActionButton;
