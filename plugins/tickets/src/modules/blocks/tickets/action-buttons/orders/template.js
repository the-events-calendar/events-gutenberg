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
import { Tag as TagIcon } from '@moderntribe/common/src/modules/icons';

const OrdersActionButton = ( { href } ) => ( href && (
	<a
		className="tribe-editor__action-link"
		href={ href }
		target="_blank"
		rel="noopener noreferrer"
	>
		<TagIcon />
		<span>{ __( 'Orders', 'events-gutenberg' ) }</span>
	</a>
) );

OrdersActionButton.propTypes = {
	href: PropTypes.string.isRequired,
};

export default OrdersActionButton;
