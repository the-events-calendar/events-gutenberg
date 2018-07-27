/**
 * External dependencies
 */
import { trim, isEmpty } from 'lodash';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
	CheckboxControl,
	TextControl,
	PanelBody,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { Dashboard } from 'elements';
import { parser, isFree } from 'utils/range';
import { sendValue } from 'editor/utils/input';
import './style.pcss';

/**
 * Module Code
 */

class EventPrice extends Component {

	componentDidMount() {
		const { onKeyDown, onClick } = this.props;
		document.addEventListener( 'keydown', onKeyDown );
		document.addEventListener( 'click', onClick );
	}

	componentWillUnmount() {
		const { onKeyDown, onClick } = this.props;
		document.removeEventListener( 'keydown', onKeyDown );
		document.removeEventListener( 'click', onClick );
	}

	renderLabel() {
		const { currencyPosition, openDashboard } = this.props;
		const containerClass = classNames(
			'tribe-editor__event-price__price',
			`tribe-editor__event-price__price--${ currencyPosition }`,
		);

		return (
			<div
				className={ containerClass }
				onClick={ openDashboard }
			>
				{ this.renderCurrency() }
				{ this.renderPlaceholder() }
				{ this.renderCost() }
				{ this.renderDescription() }
			</div>
		);
	}

	renderCurrency() {
		const { cost, currencySymbol } = this.props;
		const parsed = parser( cost );

		const hasPrice = ! this.isEmpty( parsed ) && ! isFree( cost );

		if ( ! hasPrice ) {
			return null;
		}

		return (
			<span className="tribe-editor__event-price__currency">
				{ currencySymbol }
			</span>
		);
	}

	renderPlaceholder() {
		const placeholder = __( 'Add Price', 'events-gutenberg' );

		const { cost } = this.props;
		const parsed = parser( cost );

		if ( ! this.isEmpty( parsed ) ) {
			return null;
		}

		return (
			<span className="tribe-editor__event-price__label">{ placeholder }</span>
		);
	}

	renderCost() {
		const { cost } = this.props;
		const parsed = parser( cost );

		if ( this.isEmpty( parsed ) && ! isFree( cost ) ) {
			return null;
		}

		let value = parsed;

		if ( isFree( cost ) ) {
			value = __( 'Free', 'events-gutenberg' );
		}

		return <span className="tribe-editor__event-price__cost">{ value }</span>;
	}

	renderDescription() {
		const { costDescription } = this.props;

		if ( this.isEmpty( costDescription ) ) {
			return null;
		}

		return <span className="tribe-editor__event-price__description">{ costDescription }</span>;
	}

	renderDashboard() {
		const { dashboardOpen, cost, costDescription, setCost, setDescription } = this.props;

		return (
			<Dashboard open={ dashboardOpen }>
				<Fragment>
					<section className="tribe-editor__event-price__dashboard">
						<input
							className={ classNames( 'tribe-editor__event-price__input', 'tribe-editor__event-price__input--price' ) }
							name="description"
							type="text"
							placeholder={ __( 'Fixed Price or Range', 'events-gutenberg' ) }
							onChange={ sendValue( setCost ) }
							value={ cost }
						/>
						<input
							className={ classNames( 'tribe-editor__event-price__input', 'tribe-editor__event-price__input--description' ) }
							name="description"
							type="text"
							placeholder={ __( 'Description', 'events-gutenberg' ) }
							onChange={ sendValue( setDescription ) }
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

	renderControls() {
		const {
			isSelected,
			currencySymbol,
			currencyPosition,
			setSymbol,
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
						placeholder={ __( 'E.g.: $', 'events-gutenberg' ) }
						onChange={ setSymbol }
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

	setCurrencyPosition = ( value ) => this.props.togglePosition( ! value );

	isEmpty( value ) {
		return isEmpty( trim( value ) );
	}

	render() {
		return [
			this.renderUI(),
			this.renderControls(),
		];
	}

}

export default EventPrice;
