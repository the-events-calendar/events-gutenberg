/**
 * External dependencies
 */
import { noop, trim, isEmpty } from 'lodash';
import classNames from 'classnames';
import React from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	ToggleControl,
	TextControl,
	PanelBody,
} from '@wordpress/components';

import {
	PlainText,
	InspectorControls,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	Dashboard,
} from 'elements';

import { getSetting } from 'editor/settings';
import './style.pcss';
import { extractParts, parser, isFree } from 'utils/range';

/**
 * Module Code
 */

export default class EventPrice extends Component {
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
			<section key="event-price-box" className="tribe-editor-block">
				<div className="tribe-editor__event-cost">
					{ this.renderLabel() }
					{ this.renderDashboard() }
				</div>
			</section>
		);
	}

	renderLabel() {
		const currencyPosition = this.getCurrencyPosition();

		const containerClass = classNames(
			'event-price__label-container',
			`event-price__label-container--${ currencyPosition }`,
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

	getCurrencyPosition() {
		const { attributes } = this.props;
		const { eventCurrencyPosition } = attributes;

		// If we have it saved we replace it
		if ( eventCurrencyPosition ) {
			return eventCurrencyPosition;
		}

		return '1' === getSetting( 'reverseCurrencyPosition', 0 ) ? 'suffix' : 'prefix';
	}

	getCurrencySymbol() {
		const { attributes } = this.props;
		const { eventCurrencySymbol } = attributes;

		if ( eventCurrencySymbol ) {
			return eventCurrencySymbol;
		}

		return getSetting( 'defaultCurrencySymbol', __( '$', 'events-gutenberg' ) );
	}

	isEmpty( value ) {
		return isEmpty( trim( value ) );
	}

	renderCurrency() {
		const currencySymbol = this.getCurrencySymbol();
		const { attributes } = this.props;
		const { eventCostDescription, eventCost } = attributes;
		const cost = parser( eventCost );

		const hasPrice = ! this.isEmpty( cost ) && ! isFree( cost );
		const hideCurrency = ! hasPrice && ! this.isEmpty( eventCostDescription );

		const currencyClassNames = classNames( [
			'event-price__currency',
			{
				'event-price__currency--active': hasPrice,
				'event-price__currency--disabled': hideCurrency,
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

		const { attributes } = this.props;
		const { eventCost } = attributes;

		if ( ! this.isEmpty( eventCost ) ) {
			return null;
		}

		return (
			<span className="event-price__label">{ placeholder }</span>
		);
	}

	renderCost() {
		const { attributes } = this.props;
		const { eventCost } = attributes;
		const cost = parser( eventCost );

		if ( this.isEmpty( cost ) ) {
			return null;
		}

		if ( isFree( cost ) ) {
			return null;
		}

		return <span className="event-price__cost">{ cost }</span>;
	}

	renderDescription() {
		const { attributes } = this.props;
		const { eventCostDescription } = attributes;

		if ( this.isEmpty( eventCostDescription ) ) {
			return null;
		}

		return <span className="event-price__description">{ eventCostDescription }</span>;
	}

	toggleDashboard = () => {
		const { dashboardRef } = this;
		const { current } = dashboardRef;

		if ( ! current ) {
			return noop();
		}

		current.toggle();
	};

	renderDashboard() {
		const { attributes } = this.props;
		const { eventCost, eventCostDescription } = attributes;

		return (
			<Dashboard
				ref={ this.dashboardRef }
				onClose={ this.onCloseDashboard }
				onOpen={ this.onOpenDashboard }
			>
				<section className="event-price__dashboard-container">
					<input
						className={ classNames( 'event-price__input', 'event-price__input--price' ) }
						name="description"
						type="text"
						placeholder={ __( 'Fixed Price or Range', 'events-gutenberg' ) }
						onChange={ ( event ) => this.saveAttribute( event.target.value, 'eventCost' ) }
						value={ eventCost }
					/>
					<input
						className={ classNames( 'event-price__input', 'event-price__input--description' ) }
						name="description"
						type="text"
						placeholder={ __( 'Description', 'events-gutenberg' ) }
						onChange={ ( event ) => this.saveAttribute( event.target.value, 'eventCostDescription' ) }
						value={ eventCostDescription || '' }
					/>
				</section>
				<footer className="event-price__dashboard-footer">
					{ __( 'enter 0 as price for free events', 'events-gutenberg' ) }
				</footer>
			</Dashboard>
		);
	}

	saveAttribute = ( value, attribute ) => {
		const { setAttributes } = this.props;
		const toSave = {};
		toSave[ attribute ] = value;
		setAttributes( toSave );
	};

	onCloseDashboard = () => {
		this.setState( { open: false } );
	};

	onOpenDashboard = () => {
		this.setState( { open: true } );
		const { setAttributes, attributes } = this.props;
		const { eventCost } = attributes;
		setAttributes( {
			eventCost: parser( eventCost ),
		} );
	};

	renderControls() {
		const { isSelected, setAttributes } = this.props;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Price Settings', 'events-gutenberg' ) }>
					<TextControl
						label={ __( ' Currency Symbol', 'events-gutenberg' ) }
						value={ this.getCurrencySymbol() }
						placeholder={ __( 'E.g.: $', 'events-gutenberg' ) }
						onChange={ ( value ) => setAttributes( { eventCurrencySymbol: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show symbol before', 'events-gutenberg' ) }
						checked={ 'prefix' === this.getCurrencyPosition() }
						onChange={ ( value ) => setAttributes( { eventCurrencyPosition: value ? 'prefix' : 'suffix' } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

