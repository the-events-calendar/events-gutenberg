/**
 * External dependencies
 */
import { trim, isEmpty, get as getFromObject } from 'lodash';
import classNames from 'classnames';
import React, { Fragment } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, compose } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import {
	CheckboxControl,
	TextControl,
	PanelBody,
} from '@wordpress/components';

import {
	InspectorControls,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import {
	Dashboard,
} from 'elements';

import './style.pcss';
import { parser, isFree } from 'utils/range';
import { STORE_NAME as DETAILS_STORE } from 'data/details';
import withSaveData from 'editor/hoc/with-save-data';

/**
 * Module Code
 */

class EventPrice extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			open: false,
		};

		this.dashboardRef = React.createRef();
	}

	render() {
		return [
			this.renderUI(),
			this.renderControls(),
		];
	}

	renderUI() {
		return (
			<section key="event-price-box" className="tribe-editor__block">
				<div className="tribe-editor__event-price">
					{ this.renderLabel() }
					{ this.renderDashboard() }
				</div>
			</section>
		);
	}

	renderLabel() {
		const { currencyPosition } = this.props;
console.log(currencyPosition);
		const containerClass = classNames(
			'tribe-editor__event-price',
			`tribe-editor__event-price--${ currencyPosition }`,
		);

		return (
			<div
				className={ containerClass }
				onClick={ this.toggleDashboard }
			>
				{ this.renderCurrency() }
				{ this.renderPlaceholder() }
				{ this.renderCost() }
				{ this.renderDescription() }
			</div>
		);
	}

	isEmpty( value ) {
		return isEmpty( trim( value ) );
	}

	renderCurrency() {
		const { costDescription, cost, currencySymbol } = this.props;
		const parsed = parser( cost );

		const hasPrice = ! this.isEmpty( parsed ) && ! isFree( parsed );
		const hideCurrency = ! hasPrice && ! this.isEmpty( costDescription );

		const currencyClassNames = classNames( [
			'tribe-editor__event-price__currency',
			{
				'tribe-editor__event-price__currency--active': hasPrice,
				'tribe-editor__event-price__currency--disabled': hideCurrency,
			},
		] );

		return <span className={ currencyClassNames }>{ currencySymbol }</span>;
	}

	renderPlaceholder() {
		const { open } = this.state;
		const placeholder = __( 'Add Price', 'events-gutenberg' );

		if ( open ) {
			return null;
		}

		const { cost } = this.props;

		if ( ! this.isEmpty( cost ) ) {
			return null;
		}

		return (
			<span className="tribe-editor__event-price__label">{ placeholder }</span>
		);
	}

	renderCost() {
		const { cost } = this.props;
		const parsed = parser( cost );

		if ( this.isEmpty( parsed ) ) {
			return null;
		}

		if ( isFree( parsed ) ) {
			return null;
		}

		return <span className="tribe-editor__event-price__cost">{ parsed }</span>;
	}

	renderDescription() {
		const { costDescription } = this.props;

		if ( this.isEmpty( costDescription ) ) {
			return null;
		}

		return <span className="tribe-editor__event-price__description">{ costDescription }</span>;
	}

	toggleDashboard = () => {
		this.setState( ( state ) => {
			return {
				open: ! state.open,
			};
		} );
	};

	renderDashboard() {
		const { cost, costDescription, setCost } = this.props;

		return (
			<Dashboard
				ref={ this.dashboardRef }
				open={ this.state.open }
				onClose={ this.onCloseDashboard }
			>
				<Fragment>
					<section className="tribe-editor__event-price__dashboard">
						<input
							className={ classNames( 'tribe-editor__event-price__input', 'tribe-editor__event-price__input--price' ) }
							name="description"
							type="text"
							placeholder={ __( 'Fixed Price or Range', 'events-gutenberg' ) }
							onChange={ setCost }
							value={ cost }
						/>
						<input
							className={ classNames( 'tribe-editor__event-price__input', 'tribe-editor__event-price__input--description' ) }
							name="description"
							type="text"
							placeholder={ __( 'Description', 'events-gutenberg' ) }
							onChange={ this.savePriceDescription }
							value={ costDescription }
						/>
					</section>
					<footer className="tribe-editor__event-price__dashboard__footer">
						{ __( 'enter 0 as price for free events', 'events-gutenberg' ) }
					</footer>
				</Fragment>
			</Dashboard>
		);
	}

	savePriceDescription = ( event ) => {
		const { target } = event;
		const { value } = target;
		const { setAttributes } = this.props;
		setAttributes( { costDescription: value } );
	};

	onCloseDashboard = () => {
		this.setState( ( state ) => {
			const { open } = state;
			if ( ! open ) {
				return null;
			}
			return { open: false };
		} );
	};

	renderControls() {
		const {
			isSelected,
			setCurrencySymbol,
			setCurrencyPosition,
			currencySymbol,
			currencyPosition,
		} = this.props;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Price Settings', 'events-gutenberg' ) }>
					<TextControl
						className="tribe-editor__event-price__currency-symbol-setting"
						label={ __( ' Currency Symbol', 'events-gutenberg' ) }
						value={ currencySymbol }
						placeholder={ __( '$', 'events-gutenberg' ) }
						onChange={ setCurrencySymbol }
						maxLength="1"
						size="1"
					/>
					<CheckboxControl
						label={ __( 'Currency symbol follows price', 'events-gutenberg' ) }
						checked={ 'suffix' === currencyPosition }
						onChange={ this.setCurrencyPosition }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	setCurrencyPosition = ( value ) => {
		const { setCurrencyPosition } = this.props;
		setCurrencyPosition( ! value );
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { get } = select( DETAILS_STORE );
		const { attributes } = props;
		return {
			currencyPosition: get( 'currencyPosition' ),
			currencySymbol: get( 'currencySymbol' ),
			cost: get( 'cost' ),
			costDescription: getFromObject( attributes, 'costDescription', '' ),
		};
	} ),
	withDispatch( ( dispatch, props ) => {
		const {
			setCost,
			setCurrencySymbol,
			setCurrencyPosition,
		} = dispatch( DETAILS_STORE );

		return {
			setInitialState() {
				const { attributes } = props;
				const { cost } = attributes;
				setCost( cost );
			},
			setCurrencySymbol,
			setCurrencyPosition,
			setCost( event ) {
				const { target } = event;
				const { value } = target;
				setCost( value );
			},
		};
	} ),
	withSaveData(),
] )( EventPrice );

