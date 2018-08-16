/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import chrono from 'chrono-node';
import { noop, debounce } from 'lodash';

/**
 * Internal dependencies
 */
import './style.pcss';
import { toDateTime, toMoment } from '@moderntribe/events/editor/utils/moment';

const Input = ( { value, onClickHandler, onChange, before, after } ) => (
	<div className="tribe-editor__date-input__container">
		{ before }
		<input
			type="text"
			name="date-input"
			className="tribe-editor__date-input"
			value={ value }
			onChange={ onChange }
			onFocus={ onClickHandler }
		/>
		{ after }
	</div>
);

Input.propTypes = {
	value: PropTypes.string,
	onClickHandler: PropTypes.func,
	onChange: PropTypes.func,
	before: PropTypes.node,
	after: PropTypes.node,
};

Input.defaultProps = {
	value: '',
	onClickHandler: noop,
	onChange: noop,
	before: null,
	after: null,
};

const Label = ( { children } ) => (
	<div className="tribe-editor__btn--label">
		{ children }
	</div>
);

Label.propTypes = {
	children: PropTypes.node,
};

Label.defaultProps = {
	children: null,
};

const _parse = ( value, setDateTime ) => {
	const [ parsed ] = chrono.parse( value );
	if ( ! parsed ) {
		return null;
	}

	const { start, end } = parsed;

	const dates = {
		start: start ? toDateTime( toMoment( start.date() ) ) : null,
		end: end ? toDateTime( toMoment( end.date() ) ) : null,
	};
	setDateTime( dates );
};

const DateInput = ( props ) => {
	const parse = debounce( _parse, 500 );

	const handleChange = ( event ) => {
		const { value } = event.target;
		props.onChange( value );
		parse( value, props.setDateTime );
	};

	return props.selected
		? <Input { ...props } onChange={ handleChange } />
		: <Label { ...props } />;
};

DateInput.propTypes = {
	selected: PropTypes.bool,
	setDateTime: PropTypes.func,
	onClickHandler: PropTypes.func,
	onChange: PropTypes.func,
	before: PropTypes.node,
	after: PropTypes.node,
	value: PropTypes.string,
};

DateInput.defaultProps = {
	selected: false,
	setDateTime: noop,
	onClickHandler: noop,
	onChange: noop,
	before: null,
	after: null,
	value: '',
};

export default DateInput;
