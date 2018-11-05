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
// @todo: orders SVG is loading weird, so, not using this icon yet
// import { Orders } from '@moderntribe/tickets/icons';
import { Tag as Orders } from '@moderntribe/common/src/modules/icons';

const OrdersActionButton = ( { href } ) => ( href && (
	<ActionButton
		asLink={ true }
		href={ href }
		icon={ <Orders /> }
		target="_blank"
	>
		{ __( 'Orders', 'events-gutenberg' ) }
	</ActionButton>
) );

OrdersActionButton.propTypes = {
	href: PropTypes.string.isRequired,
};

export default OrdersActionButton;
