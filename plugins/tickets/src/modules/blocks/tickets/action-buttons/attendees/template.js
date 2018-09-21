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
import SettingsActionButton from '../settings/template';

const AttendeesActionButton = ( { label, onClick, icon } ) => (
	<ActionButton icon={ icon } onClick={ onClick }>
		{ label }
	</ActionButton>
);

AttendeesActionButton.propTypes = {
	onClick: PropTypes.func,
	label: PropTypes.string,
	icon: PropTypes.node,
};

AttendeesActionButton.defaultProps = {
	onClick: noop,
	label: __( 'Attendees', 'events-gutenberg' ),
	icon: <UserIcon />,
};

export default AttendeesActionButton;
