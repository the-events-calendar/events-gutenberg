/**
 * External dependencies
 */
import { noop, uniqueid } from 'lodash';
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
		id: PropTypes.string,
	};

	/**
	 * Set the default values for the required properties if not provided
	 */
	static defaultProps = {
		checked: false,
		onChange: noop,
		id: uniqueid( 'tribe-checkbox' ),
	};

	constructor() {
		super( ...arguments );

		this.inputRef = React.createRef();
		this.state = {
			checked: this.props.checked,
		};
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
			this.props.onChange( checked );
		});
	};

	toggle = () => {
		const { checked } = this.state;
		this.inputRef.current.checked = ! checked;
		this.setState( { checked: ! checked }, () => {
			this.props.onChange( ! checked );
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
				className="tribe-checkbox-container"
				type="button"
				onClick={ this.toggle }
			>
				<label>{ label }</label>
				{ this.renderIcon() }
				<input
					className="tribe-checkbox-input"
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
