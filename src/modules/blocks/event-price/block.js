/**
 * External dependencies
 */
import { trim, isEmpty, isFunction } from 'lodash';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
	ToggleControl,
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
import withSaveData from 'editor/hoc/with-save-data';
import * as actions from 'data/blocks/price/actions';
import * as selectors from 'data/blocks/price/selectors';
import { sendValue } from 'editor/utils/input';

/**
 * Module Code
 */

class EventPrice extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			open: false,
		};
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
		const { currencyPosition } = this.props;

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
		const { cost, costDescription, setCost, setDescription } = this.props;

		return (
			<Dashboard
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
			currencySymbol,
			currencyPosition,
			setSymbol,
			togglePosition,
		} = this.props;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Price Settings', 'events-gutenberg' ) }>
					<TextControl
						label={ __( ' Currency Symbol', 'events-gutenberg' ) }
						value={ currencySymbol }
						placeholder={ __( 'E.g.: $', 'events-gutenberg' ) }
						onChange={ setSymbol }
					/>
					<ToggleControl
						label={ __( 'Show symbol before', 'events-gutenberg' ) }
						checked={ 'prefix' === currencyPosition }
						onChange={ togglePosition }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

const mapStateToProps = ( state ) => ( {
	cost: selectors.getPrice( state ),
	currencyPosition: selectors.getPosition( state ),
	currencySymbol: selectors.getSymbol( state ),
	costDescription: selectors.getDescription( state ),
} );

const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withSaveData(),
)( EventPrice );
