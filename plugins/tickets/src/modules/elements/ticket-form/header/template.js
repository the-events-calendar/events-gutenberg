/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
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

class Header extends PureComponent {
	static PRICE_POSITIONS = {
		suffix: 'suffix',
		prefix: 'prefix',
	};

	static propTypes = {
		title: PropTypes.string,
		titlePlaceholder: PropTypes.string,
		setTitle: PropTypes.func,
		description: PropTypes.string,
		descriptionPlaceholder: PropTypes.string,
		setDescription: PropTypes.func,
		price: PropTypes.number,
		priceCurrency: PropTypes.string,
		pricePosition: PropTypes.oneOf( Object.keys( Header.PRICE_POSITIONS ) ),
		pricePlaceholder: PropTypes.string,
		setPrice: PropTypes.func,
		expires: PropTypes.bool,
	};

	static defaultProps = {
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
		pricePosition: Header.PRICE_POSITIONS.prefix,
		expires: true,
	};

	constructor( props ) {
		super( props );
		this.ids = {
			price: uniqid( 'ticket-creation-price-' ),
			title: uniqid( 'ticket-creation-title-' ),
			description: uniqid( 'ticket-creation-description-' ),
		};
	}

	renderPriceInput() {
		const { price, pricePlaceholder, setPrice } = this.props;

		return (
			<AutosizeInput
				key="price-input"
				id={ this.ids.price }
				name="ticket-creation-description"
				className="tribe-editor__new-ticket__description"
				value={ price }
				placeholder={ pricePlaceholder }
				onChange={ sendValue( setPrice ) }
			/>
		);
	}

	renderPriceLabel() {
		const { priceCurrency } = this.props;
		return [ <span key="price-currency">{ priceCurrency }</span>, this.renderPriceInput() ];
	}

	renderPrice() {
		const { pricePosition } = this.props;
		return pricePosition === Header.PRICE_POSITIONS.prefix
			? this.renderPriceLabel()
			: [ ...this.renderPriceLabel() ].reverse();
	}

	render() {
		const {
			title,
			titlePlaceholder,
			setTitle,
			description,
			descriptionPlaceholder,
			setDescription,
			expires,
		} = this.props;

		return (
			<header className="tribe-editor__new-ticket__header">
				<div className="tribe-editor__new-ticket__icon">
					<TicketStatus expires={ expires } />
				</div>
				<div className="tribe-editor__new-ticket__content">
					<AutosizeInput
						id={ this.ids.title }
						name="ticket-creation-title"
						className="tribe-editor__new-ticket__title"
						value={ title }
						placeholder={ titlePlaceholder }
						onChange={ sendValue( setTitle ) }
					/>
					<AutosizeInput
						id={ this.ids.description }
						name="ticket-creation-description"
						className="tribe-editor__new-ticket__description"
						value={ description }
						placeholder={ descriptionPlaceholder }
						onChange={ sendValue( setDescription ) }
					/>
				</div>
				<div className="tribe-editor__new-ticket__price">
					{ this.renderPrice() }
				</div>
			</header>
		);
	}
}

export default Header;
