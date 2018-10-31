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

const AttendeesActionButton = ( { isDisabled, onClick } ) => (
	<ActionButton
		className="tribe-editor__rsvp__action-button tribe-editor__rsvp__action-button--attendees"
		disabled={ isDisabled }
		icon={ <Attendees /> }
		onClick={ onClick }
	>
		{ __( 'Attendees', 'events-gutenberg' ) }
	</ActionButton>
);

AttendeesActionButton.propTypes = {
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func,
};

AttendeesActionButton.defaultProps = {
	onClick: noop,
};

export default AttendeesActionButton;
