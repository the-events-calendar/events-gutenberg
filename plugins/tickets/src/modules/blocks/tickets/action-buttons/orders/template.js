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
import { Tag as TagIcon } from '@moderntribe/common/src/modules/icons';
import SettingsActionButton from '../settings/template';

const OrdersActionButton = ( { label, onClick, icon } ) => (
	<ActionButton icon={ icon } onClick={ onClick }>
		{ label }
	</ActionButton>
);

OrdersActionButton.propTypes = {
	onClick: PropTypes.func,
	label: PropTypes.string,
	icon: PropTypes.node,
};

OrdersActionButton.defaultProps = {
	onClick: noop,
	label: __( 'Orders', 'events-gutenberg' ),
	icon: <TagIcon />,
};

export default OrdersActionButton;
