/**
 * External dependencies
 */
import { noop, uniqueId } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import React from 'react';

/**
 * Internal dependencies
 */
import IconOn from 'icons/checkbox-on.svg';
import IconOff from 'icons/checkbox-off.svg';
import './style.pcss';

/**
 * Module Code
 */
export default class CheckBox extends Component {
	/**
	 * Default types for properties required for this component
	 */
	static propTypes = {
		checked: PropTypes.bool,
		onChange: PropTypes.func,
	};

	/**
	 * Set the default values for the required properties if not provided
	 */
	static defaultProps = {
		checked: false,
		onChange: noop,
	};

	constructor( props ) {
		super( ...arguments );

		this.inputRef = React.createRef();
		this.state = {
			checked: props.checked,
		};
	}

	static getDerivedStateFromProps( nextProps, prevState ) {
		const { checked } = nextProps;
		if ( checked === prevState.checked ) {
			return null;
		}

		return { checked };
	}

	/**
	 * Callback fired every time the input changes, sending a normalized boolean value
	 *
	 * @param {Event} event The event associated with onChange listener.
	 */
	onChange = ( event ) => {
		const { target } = event;
		const { checked } = target;
		this.setState( { checked }, () => {
			this.props.onChange( this.state.checked );
		} );
	};

	toggle = () => {
		const { checked } = this.state;
		this.inputRef.current.checked = ! checked;
		this.setState( { checked: ! checked }, () => {
			this.props.onChange( this.state.checked );
		} );
	};

	renderIcon() {
		const { checked } = this.state;
		return checked ? <IconOn /> : <IconOff />;
	}

	render() {
		// Remove properties that are not part of the DOM.
		const { label, onChange, checked, ...properties } = this.props;
		return (
			<button
				className="tribe-editor__checkbox"
				type="button"
				onClick={ this.toggle }
			>
				<label>{ label }</label>
				{ this.renderIcon() }
				<input
					className="tribe-editor__checkbox"
					type="checkbox"
					ref={ this.inputRef }
					onChange={ this.onChange }
					aria-hidden="true"
					{ ...properties }
				/>
			</button>
		);
	}
}
