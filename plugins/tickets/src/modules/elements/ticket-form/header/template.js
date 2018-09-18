/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';
import noop from 'lodash/noop';
import uniqid from 'uniqid';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TicketStatus } from '@moderntribe/tickets/elements';
import './style.pcss';
import { sendValue } from '@moderntribe/common/utils/input';

const PRICE_POSITIONS = {
	suffix: 'suffix',
	prefix: 'prefix',
};

const Header = ( props ) => {
	const {
		title,
		titlePlaceholder,
		setTitle,
		description,
		descriptionPlaceholder,
		setDescription,
		price,
		pricePosition,
		priceCurrency,
		pricePlaceholder,
		setPrice,
		expires,
	} = props;

	const priceInput = (
		<AutosizeInput
			key="price-input"
			id={ uniqid( 'ticket-creation-price-' ) }
			name="ticket-creation-description"
			className="tribe-editor__new-ticket__description"
			value={ price }
			placeholder={ pricePlaceholder }
			onChange={ sendValue( setPrice ) }
		/>
	);
	const priceLabel = [ <span key="price-currency">{priceCurrency}</span>, priceInput ];

	return (
		<header className="tribe-editor__new-ticket__header">
			<div className="tribe-editor__new-ticket__icon">
				<TicketStatus expires={ expires } />
			</div>
			<div className="tribe-editor__new-ticket__content">
				<AutosizeInput
					id={ uniqid( 'ticket-creation-title-' ) }
					name="ticket-creation-title"
					className="tribe-editor__new-ticket__title"
					value={ title }
					placeholder={ titlePlaceholder }
					onChange={ sendValue( setTitle ) }
				/>
				<AutosizeInput
					id={ uniqid( 'ticket-creation-description-' ) }
					name="ticket-creation-description"
					className="tribe-editor__new-ticket__description"
					value={ description }
					placeholder={ descriptionPlaceholder }
					onChange={ sendValue( setDescription ) }
				/>
			</div>
			<div className="tribe-editor__new-ticket__price">
				{ pricePosition === PRICE_POSITIONS.prefix ? priceLabel : [ ...priceLabel ].reverse() }
			</div>
		</header>
	);
};

Header.propTypes = {
	title: PropTypes.string,
	titlePlaceholder: PropTypes.string,
	setTitle: PropTypes.func,
	description: PropTypes.string,
	descriptionPlaceholder: PropTypes.string,
	setDescription: PropTypes.func,
	price: PropTypes.number,
	priceCurrency: PropTypes.string,
	pricePosition: PropTypes.oneOf( Object.keys( PRICE_POSITIONS ) ),
	pricePlaceholder: PropTypes.string,
	setPrice: PropTypes.func,
	expires: PropTypes.bool,
};

Header.defaultProps = {
	title: '',
	titlePlaceholder: __( 'Ticket Type', 'events-gutenberg' ),
	setTitle: noop,
	description: '',
	descriptionPlaceholder: __( 'Description', 'events-gutenberg' ),
	setDescription: noop,
	price: 0,
	pricePlaceholder: __( '0', 'events-gutenberg' ),
	setPrice: noop,
	priceCurrency: __( '$', 'events-gutenberg' ),
	pricePosition: PRICE_POSITIONS.prefix,
	expires: true,
};

export default Header;
