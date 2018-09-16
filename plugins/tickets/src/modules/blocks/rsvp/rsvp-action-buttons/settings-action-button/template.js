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
import { Cog as CogIcon } from '@moderntribe/common/src/modules/icons';

const SettingsActionButton = ( {
	onClick,
} ) => (
	<ActionButton
		className="tribe-editor__rsvp__action-button tribe-editor__rsvp__action-button--settings"
		icon={ <CogIcon /> }
	>
		Settings
	</ActionButton>
);

SettingsActionButton.defaultProps = {
	onClick: noop,
};

SettingsActionButton.propTypes = {
	onClick: PropTypes.func,
};

export default SettingsActionButton;
