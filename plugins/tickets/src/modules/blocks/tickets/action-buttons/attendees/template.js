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
import { User as UserIcon } from '@moderntribe/common/src/modules/icons';

const AttendeesActionButton = ( { onClick } ) => (
	<ActionButton icon={ <UserIcon /> } onClick={ onClick }>
		{ __( 'Attendees', 'events-gutenberg' ) }
	</ActionButton>
);

AttendeesActionButton.propTypes = {
	onClick: PropTypes.func,
};

AttendeesActionButton.defaultProps = {
	onClick: noop,
};

export default AttendeesActionButton;
