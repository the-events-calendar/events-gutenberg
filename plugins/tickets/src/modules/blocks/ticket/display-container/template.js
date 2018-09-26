/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import {
	Alert,
	Clipboard,
	Pencil,
} from '@moderntribe/common/icons';
import StatusIcon from './status-icon/element';
import QuantityBar from './quantity-bar/element';
import { Button } from '@moderntribe/common/elements';

const TicketDisplayContainer = ( props ) => {
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
		isSelected,
	} = props;

	const priceLabel = [ currencySign, price ];
	const amountSold = isUnlimited
		? `${ available } sold`
		: `${ available } of ${ quantity } sold`;

	let quantityBar = <span className="tribe-editor__quantity--unlimited">unlimited</span>;

	if ( ! isUnlimited ) {
		quantityBar = <QuantityBar sold={ sold } shared={ 120 } total={ quantity } />;
	}

	return (
		<Fragment>
			<div className="tribe-editor__ticket-icon">
				<StatusIcon expires={ expires } />
			</div>
			<div className="tribe-editor__ticket-content">
				<div className="tribe-editor__ticket-title-container">
					<h3 className="tribe-editor__ticket-title">{ title }</h3>
					{ isSelected && (
						<Button className="tribe-editor__btn--label" onClick={ editBlock }><Pencil /></Button>
					) }
				</div>
				{ description && <div className="tribe-editor__ticket-description">{ description }</div> }
			</div>
			<div className="tribe-editor__ticket-price">
				{ 'suffix' === currencyPosition ? [ ...priceLabel ].reverse() : priceLabel }
			</div>
			<div className="tribe-editor__ticket-quantity">
				<span className="tribe-editor__quantity-label">{ amountSold }</span>
				{ quantityBar }
			</div>
		</Fragment>
	);
};

/**
 <button className="tribe-editor__btn--label"><Clipboard /></button>
 <span className="tribe-editor__quantity-label">{ amountSold }<Alert /></span>
 <QuantityBar sold={ 40 } shared={ 120 } total={ 156 } />
 <QuantityBar sold={ 40 } capacity={ 70 } shared={ 120 } total={ 156 } />
 */

TicketDisplayContainer.propTypes = {
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

TicketDisplayContainer.defaultProps = {
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

export default TicketDisplayContainer;
