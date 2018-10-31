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
	<a
		className="tribe-editor__action-link"
		href={ href }
		target="_blank"
		rel="noopener noreferrer"
	>
		<RSVP />
		<span>{ __( 'Attendees', 'events-gutenberg' ) }</span>
	</a>
) );

AttendeesActionButton.propTypes = {
	href: PropTypes.string.isRequired,
	hasProviders: PropTypes.bool,
};

export default AttendeesActionButton;
