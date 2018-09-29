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

const OrdersActionButton = ( { onClick } ) => (
	<ActionButton icon={ <TagIcon /> } onClick={ onClick }>
		{ __( 'Orders', 'events-gutenberg' ) }
	</ActionButton>
);

OrdersActionButton.propTypes = {
	onClick: PropTypes.func,
};

OrdersActionButton.defaultProps = {
	onClick: noop,
};

export default OrdersActionButton;
