/**
 * External dependencies
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import chrono from 'chrono-node';
import { noop, isUndefined, isFunction, debounce } from 'lodash';

/**
 * Internal dependencies
 */
import './style.pcss';
import { toDateTime, toMoment } from 'editor/utils/moment';

const nullableType = ( props, name ) => {
	if ( isUndefined( props[ name ] ) ) {
		return;
	}

	if ( ! isFunction( props[ name ] ) ) {
		return new Error( `Invalid prop ${ name } should be undefined or a function` );
	}
};

class DateInput extends Component {
	static propTypes = {
		selected: PropTypes.bool,
		children: PropTypes.node,
		value: PropTypes.string,
		onClickHandler: PropTypes.func,
		setNaturalLanguageLabel: PropTypes.func,
		setDateTime: nullableType,
	};

	static defaultProps = {
		selected: false,
		children: null,
		value: '',
		onClickHandler: noop,
		setDateTime: noop,
		setNaturalLanguageLabel: noop,
	};

	constructor( props ) {
		super( props );
		this.inputRef = createRef();
		this.sendDateTime = debounce( this._sendDateTime, 250 );
	}

	handleChange = ( event ) => {
		this.sendDateTime();
		this.props.setNaturalLanguageLabel( event.target.value );
	};

	_sendDateTime() {
		const { value } = this.props;
		const [ parsed ] = chrono.parse( value );
		if ( ! parsed ) {
			return;
		}

		const { start, end } = parsed;

		const dates = {
			from: start ? toDateTime( toMoment( start.date() ) ) : null,
			to: end ? toDateTime( toMoment( end.date() ) ) : null,
		};

		this.props.setDateTime( dates.from, dates.to );
	}

	renderInput() {
		const { value, onClickHandler } = this.props;
		return (
			<input
				type="text"
				name="date-input"
				className="tribe-editor__date-input"
				value={ value }
				ref={ this.inputRef }
				onBlur={ this.onBlur }
				onChange={ this.handleChange }
				onFocus={ onClickHandler }
			/>
		);
	}

	renderChildren() {
		const { children, onClickHandler } = this.props;
		return (
			<div
				role="button"
				tabIndex={ 0 }
				className="tribe-editor__btn--label"
				onClick={ onClickHandler }
			>
				{ children }
			</div>
		);
	}

	render() {
		return this.props.selected ? this.renderInput() : this.renderChildren();
	}
}

export default DateInput;
