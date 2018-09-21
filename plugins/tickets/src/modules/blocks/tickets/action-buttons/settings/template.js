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
import { Cog as CogIcon } from '@moderntribe/common/src/modules/icons';

const SettingsActionButton = ( { label, onClick, icon } ) => (
	<ActionButton icon={ icon } onClick={ onClick }>
		{ label }
	</ActionButton>
);

SettingsActionButton.propTypes = {
	onClick: PropTypes.func,
	label: PropTypes.string,
	icon: PropTypes.node,
};

SettingsActionButton.defaultProps = {
	onClick: noop,
	label: __( 'Settings', 'events-gutenberg' ),
	icon: <CogIcon />,
};

export default SettingsActionButton;
