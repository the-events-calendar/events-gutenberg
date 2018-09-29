/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	Alert,
	Clipboard,
	Pencil,
} from '@moderntribe/common/icons';
import QuantityBar from './quantity-bar/element';
import { Button } from '@moderntribe/common/elements';
import { interpolateNumbers } from '@moderntribe/common/utils/string';
import './style.pcss';

/**
 * @todo render and handle the next possible items:
 *
 * - has attendees information use Clipboard icon: <button className="tribe-editor__btn--label"><Clipboard /></button>
 */

const TicketDisplay = ( props ) => {
	const {
		title,
		description,
		price,
		currencySign,
		currencyPosition,
		isUnlimited,
		expires,
		available,
		quantity,
		editBlock,
		sold,
		shared,
		isSelected,
		isShared,
	} = props;

	const priceLabel = [ currencySign, price ];
	const labels = {
		unlimited: interpolateNumbers( __( '%d sold', 'events-gutenberg' ), available ),
		normal: interpolateNumbers( __( '%d of %d sold', 'events-gutenberg' ), available, quantity ),
	};

	let quantityBar = <span className="tribe-editor__quantity--unlimited">unlimited</span>;

	if ( ! isUnlimited ) {
		quantityBar = (
			<QuantityBar
				sold={ sold }
				shared={ isShared ? quantity : 0 }
				total={ isShared ? shared : quantity }
			/>
		);
	}

	const editIcon = isSelected && (
		<Button className="tribe-editor__btn--label" onClick={ editBlock }><Pencil /></Button>
	);

	return (
		<div className="tribe-editor__ticket-display-header">
			<div className="tribe-editor__ticket-content">
				<div className="tribe-editor__ticket-title-container">
					<h3 className="tribe-editor__ticket-title">{ title }</h3>
					{ editIcon }
				</div>
				{ description && <div className="tribe-editor__ticket-description">{ description }</div> }
			</div>
			<div className="tribe-editor__ticket-price">
				{ 'suffix' === currencyPosition ? [ ...priceLabel ].reverse() : priceLabel }
			</div>
			<div className="tribe-editor__ticket-quantity">
				<span className="tribe-editor__quantity-label">
					{ isUnlimited ? labels.unlimited : labels.normal }
				</span>
				{ quantityBar }
			</div>
		</div>
	);
};

TicketDisplay.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	price: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	currencySign: PropTypes.string,
	currencyPosition: PropTypes.oneOf( [ 'prefix', 'suffix' ] ),
	isUnlimited: PropTypes.bool,
	available: PropTypes.number,
	sold: PropTypes.number,
	expires: PropTypes.bool,
	editBlock: PropTypes.func,
	isSelected: PropTypes.bool,
};

TicketDisplay.defaultProps = {
	title: '',
	description: '',
	price: 0,
	currencySign: '$',
	currencyPosition: 'prefix',
	isUnlimited: false,
	available: 0,
	quantity: 0,
	expires: true,
};

export default TicketDisplay;
