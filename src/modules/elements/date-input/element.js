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
		const from = start ? toDateTime( toMoment( start.date() ) ) : null;
		const to = end ? toDate( toMoment( end.date() ) ) : null;
		this.props.setDateTime( from, to );
	};

	onBlur = ( event ) => {
		this.sendDateTime( event.target.value );
	};

	renderInput() {
		const { placeholder } = this.props;
		return (
			<input
				type="text"
				name="date-input"
				className="tribe-editor__date-input"
				ref={ this.inputRef }
				placeholder={ placeholder }
				onBlur={ this.onBlur }
			/>
		);
	}

	render() {
		const {
			children,
			selected,
			onClickHandler,
		} = this.props;
		return (
			<div
				role="button"
				tabIndex={ 0 }
				onClick={ onClickHandler }
				onKeyDown={ onClickHandler }
			>
				{ selected ? this.renderInput() : children }
			</div>
		);
	}
}

export default DateInput;
