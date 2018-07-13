/**
 * External dependencies
 */
import { trim, isEmpty } from 'lodash';
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
import withSaveData from 'editor/hoc/with-save-data';
import {
	actions as priceActions,
	selectors as priceSelectors,
} from 'data/blocks/price';
import {
	actions as UIActions,
	selectors as UISelectors,
} from 'data/ui';
import { sendValue } from 'editor/utils/input';
import { searchParent } from 'editor/utils/dom';

/**
 * Module Code
 */

class EventPrice extends Component {
	componentDidMount() {
		document.addEventListener( 'keydown', this.onKeyDown );
		document.addEventListener( 'click', this.onClick );
	}

	componentWillUnmount() {
		document.removeEventListener( 'keydown', this.onKeyDown );
		document.removeEventListener( 'click', this.onClick );
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
		const { currencyPosition, openDashboardPrice } = this.props;
		const containerClass = classNames(
			'tribe-editor__event-price__price',
			`tribe-editor__event-price__price--${ currencyPosition }`,
		);

		return (
			<div
				className={ containerClass }
				onClick={ openDashboardPrice }
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

	/* TODO: This needs to move to logic component wrapper */
	onKeyDown = ( e ) => {
		const ESCAPE_KEY = 27;
		if ( e.keyCode === ESCAPE_KEY ) {
			this.props.closeDashboardPrice();
		}
	}

	/* TODO: This needs to move to logic component wrapper */
	onClick = ( e ) => {
		const { target } = e;
		if (
			! this.isTargetInBlock( target ) &&
			! this.isTargetInSidebar( target )
		) {
			this.props.closeDashboardPrice();
		}
	}

	/* TODO: This needs to move to logic component wrapper */
	isTargetInBlock = ( target ) => (
		searchParent( target, ( testNode ) => {
			if ( testNode.classList.contains( 'editor-block-list__block' ) ) {
				return Boolean( testNode.querySelector( '.tribe-editor__event-price' ) );
			}
			return false;
		} )
	);

	/* TODO: This needs to move to logic component wrapper */
	isTargetInSidebar = ( target ) => (
		searchParent( target, ( testNode ) => (
			testNode.classList.contains( 'edit-post-sidebar' )
		) )
	);

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
}

const mapStateToProps = ( state ) => ( {
	dashboardOpen: UISelectors.getDashboardPriceOpen( state ),
	cost: priceSelectors.getPrice( state ),
	currencyPosition: priceSelectors.getPosition( state ),
	currencySymbol: priceSelectors.getSymbol( state ),
	costDescription: priceSelectors.getDescription( state ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	...bindActionCreators( priceActions, dispatch ),
	...bindActionCreators( UIActions, dispatch ),
} );

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withSaveData(),
)( EventPrice );
