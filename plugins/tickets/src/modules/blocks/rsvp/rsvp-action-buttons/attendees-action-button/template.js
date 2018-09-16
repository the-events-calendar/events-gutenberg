/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { ActionButton } from '@moderntribe/tickets/elements';
import { User as UserIcon } from '@moderntribe/common/src/modules/icons';

const AttendeesActionButton = ( {
	onClick,
} ) => (
	<ActionButton
		className="tribe-editor__rsvp__action-button tribe-editor__rsvp__action-button--attendees"
		icon={ <UserIcon /> }
	>
		Attendees
	</ActionButton>
);

AttendeesActionButton.defaultProps = {
	onClick: noop,
};

AttendeesActionButton.propTypes = {
	onClick: PropTypes.func,
};

export default AttendeesActionButton;
