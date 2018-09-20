/**
 * External dependencies
 */
import React from 'react';
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
import './style.pcss';

const Ticket = ( props ) => {
	const {
		title,
		description,
		price,
		currencySign,
		currencyPosition,
		unlimited,
		expires,
		available,
		sold,
	} = props;

	const priceLabel = [ currencySign, price ];
	const amountSold = `${available} of ${ sold } sold`;

	return (
		<article className="tribe-editor__ticket">
			<div className="tribe-editor__ticket-icon">
				<StatusIcon expires={ expires } />
			</div>
			<div className="tribe-editor__ticket-content">
				<div className="tribe-editor__ticket-title-container">
					<h3 className="tribe-editor__ticket-title">{ title }</h3>
					<button className="tribe-editor__btn--label"><Pencil /></button>
					<button className="tribe-editor__btn--label"><Clipboard /></button>
				</div>
				{ description && <div className="tribe-editor__ticket-description">{ description }</div> }
			</div>
			<div className="tribe-editor__ticket-price">
				{ 'suffix' === currencyPosition ? [ ...priceLabel ].reverse() : priceLabel }
			</div>
			<div className="tribe-editor__ticket-quantity">
				<QuantityBar sold={ 40 } total={ 156 } />
				<span className="tribe-editor__quantity-label">{ amountSold }<Alert /></span>
				<QuantityBar sold={ 40 } shared={ 120 } total={ 156 } />
				<QuantityBar sold={ 40 } capacity={ 70 } shared={ 120 } total={ 156 } />
				<span className="tribe-editor__quantity--unlimited">unlimited</span>
			</div>
		</article>
	);
}

Ticket.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	price: PropTypes.number,
	currencySign: PropTypes.string,
	currencyPosition: PropTypes.oneOf( [ 'prefix', 'suffix' ] ),
	unlimited: PropTypes.bool,
	available: PropTypes.number,
	sold: PropTypes.number,
	expires: PropTypes.bool,
}

Ticket.defaultProps = {
	title: '',
	description: '',
	price: 0,
	currencySign: '$',
	currencyPosition: 'prefix',
	unlimited: false,
	available: 0,
	sold: 0,
	expires: true,
}

export default Ticket;
