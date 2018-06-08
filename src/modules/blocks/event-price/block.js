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
	InspectorControls,
	PlainText,
} from '@wordpress/editor';

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
			<section key="event-price-box" className="tribe-editor__block">
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

	getCurrencyPosition() {
		const { attributes } = this.props;
		const { currencyPosition } = attributes;

		// If we have it saved we replace it
		if ( currencyPosition ) {
			return currencyPosition;
		}

		return '1' === getSetting( 'reverseCurrencyPosition', 0 ) ? 'suffix' : 'prefix';
	}

	getCurrencySymbol() {
		const { attributes } = this.props;
		const { currencySymbol } = attributes;

		if ( currencySymbol ) {
			return currencySymbol;
		}

		return getSetting( 'defaultCurrencySymbol', __( '$', 'events-gutenberg' ) );
	}

	isEmpty( value ) {
		return isEmpty( trim( value ) );
	}

	renderCurrency() {
		const currencySymbol = this.getCurrencySymbol();
		const { attributes } = this.props;
		const { costDescription, cost } = attributes;
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

		const { attributes } = this.props;
		const { cost } = attributes;

		if ( ! this.isEmpty( cost ) ) {
			return null;
		}

		return (
			<span className="tribe-editor__event-price__label">{ placeholder }</span>
		);
	}

	renderCost() {
		const { attributes } = this.props;
		const { cost } = attributes;
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
		const { attributes } = this.props;
		const { costDescription } = attributes;

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
		const { attributes } = this.props;
		const { cost, costDescription } = attributes;

		return (
			<Dashboard
				ref={ this.dashboardRef }
				open={ this.state.open }
				onClose={ this.onCloseDashboard }
				onOpen={ this.onOpenDashboard }
			>
				<section className="tribe-editor__event-price__dashboard">
					<input
						className={ classNames( 'tribe-editor__event-price__input', 'tribe-editor__event-price__input--price' ) }
						name="description"
						type="text"
						placeholder={ __( 'Fixed Price or Range', 'events-gutenberg' ) }
						onChange={ ( event ) => this.saveAttribute( event.target.value, 'cost' ) }
						value={ cost }
					/>
					<input
						className={ classNames( 'tribe-editor__event-price__input', 'tribe-editor__event-price__input--description' ) }
						name="description"
						type="text"
						placeholder={ __( 'Description', 'events-gutenberg' ) }
						onChange={ ( event ) => this.saveAttribute( event.target.value, 'costDescription' ) }
						value={ costDescription || '' }
					/>
				</section>
				<footer className="tribe-editor__event-price__dashboard__footer">
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
		const { setAttributes, attributes } = this.props;
		const { cost } = attributes;
		setAttributes( {
			cost: parser( cost ),
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
						onChange={ ( value ) => setAttributes( { currencySymbol: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show symbol before', 'events-gutenberg' ) }
						checked={ 'prefix' === this.getCurrencyPosition() }
						onChange={ ( value ) => setAttributes( { currencyPosition: value ? 'prefix' : 'suffix' } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

