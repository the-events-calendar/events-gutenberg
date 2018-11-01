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
// @todo: orders SVG is loading weird, so, not using this icon yet
// import { Orders } from '@moderntribe/tickets/icons';
import { Tag as Orders } from '@moderntribe/common/src/modules/icons';

const OrdersActionButton = ( { href } ) => ( href && (
	<a
		className="tribe-editor__action-link"
		href={ href }
		target="_blank"
		rel="noopener noreferrer"
	>
		<Orders />
		<span>{ __( 'Orders', 'events-gutenberg' ) }</span>
	</a>
) );

OrdersActionButton.propTypes = {
	href: PropTypes.string.isRequired,
};

export default OrdersActionButton;
