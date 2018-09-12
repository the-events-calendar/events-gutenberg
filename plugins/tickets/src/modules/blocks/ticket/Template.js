/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import {
	TicketStatus,
	QuantityBar,
} from '@moderntribe/tickets/elements';
import './style.pcss';

const Ticket = ( props ) => {
	const {
		title,
		description,
		price,
		currencySign,
		currencyPosition,
		unlimited,
		available,
		sold,
	} = props;

	const priceLabel = [ currencySign, price ];

	return (
		<div className="tribe-editor__ticket">
			<div className="tribe-editor__ticket-icon">
				<TicketStatus unlimited={ unlimited }/>
			</div>
			<div className="tribe-editor__ticket-content">
				<h3 className="tribe-editor__ticket-title">{ title }</h3>
				{ description && <div className="tribe-editor__ticket-description">{ description }</div> }
			</div>
			<div className="tribe-editor__ticket-price">
				{ 'suffix' === currencyPosition ? [ ...priceLabel ].reverse() : priceLabel }
			</div>
			<div className="tribe-editor__ticket-quantity">
				{ `${available} of ${ sold } sold` }
				{ unlimited ? 'unlimited' : null }
				<QuantityBar sold={ 40 } total={ 156 } />
				<QuantityBar sold={ 40 } shared={ 120 } total={ 156 } />
				<QuantityBar sold={ 40 } capacity={ 70 } shared={ 120 } total={ 156 } />
			</div>
		</div>
	)
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
}

export default Ticket;
