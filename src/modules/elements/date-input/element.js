/**
 * External dependencies
 */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import chrono from 'chrono-node';
import { noop, isUndefined, isFunction } from 'lodash';

/**
 * Internal dependencies
 */
import './style.pcss';
import { toDate, toDateTime, toMoment } from 'editor/utils/moment';

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
		placeholder: PropTypes.string,
		onClickHandler: PropTypes.func,
		setDateTime: nullableType,
	};

	static defaultProps = {
		selected: false,
		children: null,
		placeholder: 'Enter your date',
		onClickHandler: noop,
		setDateTime: noop,
	};

	constructor( props ) {
		super( props );
		this.inputRef = createRef();
	}

	sendDateTime = ( text, reference ) => {
		const [ parsed ] = chrono.parse( text, reference );
		if ( ! parsed ) {
			return;
		}

		const { start, end } = parsed;

		const dates = {
			from: start ? toDateTime( toMoment( start.date() ) ) : null,
			to: end ? toDateTime( toMoment( end.date() ) ) : null,
		};
		console.log( start && start.date() );
		console.log( end && end.date() );
		console.log( dates );
		this.props.setDateTime( dates.from, dates.to );
	};

	onBlur = ( event ) => {
		this.sendDateTime( event.target.value );
	};

	renderInput() {
		const { placeholder, onClickHandler } = this.props;
		return (
			<input
				type="text"
				name="date-input"
				className="tribe-editor__date-input"
				ref={ this.inputRef }
				placeholder={ placeholder }
				onBlur={ this.onBlur }
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
