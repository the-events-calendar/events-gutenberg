/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ActionButton } from '@moderntribe/tickets/elements';
// @todo: attendee SVG is loading weird, so, not using this icon yet
// import { Attendees } from '@moderntribe/tickets/icons';
import { User as Attendees } from '@moderntribe/common/src/modules/icons';

const AttendeesActionButton = ( { href, isDisabled } ) => (
	<ActionButton
		asLink={ true }
		className="tribe-editor__rsvp__action-button tribe-editor__rsvp__action-button--attendees"
		disabled={ isDisabled }
		href={ href }
		icon={ <Attendees /> }
		target="_blank"
	>
		{ __( 'Attendees', 'events-gutenberg' ) }
	</ActionButton>
);

AttendeesActionButton.propTypes = {
	href: PropTypes.string,
	isDisabled: PropTypes.bool,
};

export default AttendeesActionButton;
