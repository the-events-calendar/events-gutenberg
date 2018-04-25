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
		this.setState( { checked } );
		this.props.onChange( checked );
	};

	toggle = () => {
		const { checked } = this.state;
		this.inputRef.current.checked = ! checked;
		this.setState( { checked: ! checked } );
	};

	renderIcon() {
		const { checked } = this.state;
		return checked ? this.renderOffIcon() : this.renderOnIcon();
	}

	renderOnIcon() {
		return (
			<svg width="26" height="14" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
				<defs>
					<path d="M91 4h12a6 6 0 0 1 0 12H91a6 6 0 1 1 0-12z" id="a"/>
					<path d="M102.333 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM91 13.333a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666z" id="b"/>
				</defs>
				<g transform="translate(-84 -3)" fill="none" fillRule="evenodd">
					<use stroke="#545D66" fill="#FFF" fillRule="nonzero" href="#a"/>
					<use fill="#545D66" href="#b"/>
				</g>
			</svg>
		);
	}

	renderOffIcon() {
		return (
			<svg width="26" height="14" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
				<defs>
					<path d="M91 4h12a6 6 0 0 1 0 12H91a6 6 0 1 1 0-12z" id="a"/>
					<circle id="b" cx="103" cy="10" r="3.333"/>
				</defs>
				<g transform="translate(-84 -3)" fill="none" fillRule="evenodd">
					<use stroke="#FFF" fill="#11A0D2" fillRule="nonzero" href="#a"/>
					<path d="M91.5 8.5v3" stroke="#FFF" strokeLinecap="square"/>
					<use fill="#FFF" transform="matrix(-1 0 0 1 206 0)" href="#b"/>
				</g>
			</svg>
		);
	}

	render() {
		// Remove properties that are not part of the DOM.
		const { label, onChange, checked, ...properties } = this.props;
		return (
			<button
				className='tribe-checkbox-container'
				type="button"
				onClick={ this.toggle }>
				<label>{ label }</label>
				{ this.renderIcon() }
				<input
					className='tribe-checkbox-input'
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
