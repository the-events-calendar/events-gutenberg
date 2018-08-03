/**
 * External dependencies
 */
import React from 'react';
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

const Input = ( props ) => (
	<input
		type="text"
		name="date-input"
		className="tribe-editor__date-input"
		value={ props.value }
		onChange={ props.onChange }
		onFocus={ props.onClickHandler }
	/>
);

Input.propTypes = {
	value: PropTypes.string,
	onClickHandler: PropTypes.func,
	onChange: PropTypes.func,
};

Input.defaultProps = {
	value: '',
	onClickHandler: noop,
	onChange: noop,
};

const Label = ( props ) => (
	<div
		role="button"
		tabIndex={ 0 }
		className="tribe-editor__btn--label"
		onClick={ props.onClickHandler }
		onKeyDown={ props.onClickHandler }
	>
		{ props.children }
	</div>
);

Label.propTypes = {
	children: PropTypes.node,
	onClickHandler: PropTypes.func,
};

Label.defaultProps = {
	children: null,
	onClickHandler: noop,
};

const _parse = ( value, setDateTime ) => {
	const [ parsed ] = chrono.parse( value );
	if ( ! parsed ) {
		return null;
	}

	const { start, end } = parsed;

	const dates = {
		from: start ? toDateTime( toMoment( start.date() ) ) : null,
		to: end ? toDateTime( toMoment( end.date() ) ) : null,
	};
	setDateTime( dates.from, dates.to );
};

const DateInput = ( props ) => {
	const parse = debounce( _parse, 500 );

	function handleChange( event ) {
		props.setNaturalLanguageLabel( event.target.value );
		parse( event.target.value, props.setDateTime );
	}

	return props.selected
		? <Input { ...props } onChange={ handleChange } />
		: <Label { ...props } />;
};

DateInput.propTypes = {
	selected: PropTypes.bool,
	setNaturalLanguageLabel: PropTypes.func,
	setDateTime: nullableType,
};

DateInput.defaultProps = {
	selected: false,
	setDateTime: noop,
	setNaturalLanguageLabel: noop,
};

export default DateInput;
