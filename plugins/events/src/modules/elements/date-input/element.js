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
import { moment } from '@moderntribe/common/utils';

const parseValue = ( value, setDateTime ) => {
	const [ parsed ] = chrono.parse( value );
	if ( ! parsed ) {
		return null;
	}

	const { start, end } = parsed;

	const dates = {
		start: start ? moment.toDateTime( moment.toMoment( start.date() ) ) : null,
		end: end ? moment.toDateTime( moment.toMoment( end.date() ) ) : null,
	};
	setDateTime( dates );
};

const handleChange = ( debouncedParseValue ) => ( onChange, setDateTime ) => ( event ) => {
	const { value } = event.target;
	onChange( value );
	debouncedParseValue( value, setDateTime );
};

const DateInput = ( props ) => {
	const { value, onChange, setDateTime, before, after } = props;
	const debouncedParseValue = debounce( parseValue, 500 );

	return (
		<div className="tribe-editor__date-input__container">
			{ before }
			<input
				type="text"
				name="date-input"
				className="tribe-editor__date-input"
				value={ value }
				onChange={ handleChange( debouncedParseValue )( onChange, setDateTime ) }
			/>
			{ after }
		</div>
	);
};

DateInput.propTypes = {
	setDateTime: PropTypes.func,
	onChange: PropTypes.func,
	before: PropTypes.node,
	after: PropTypes.node,
	value: PropTypes.string,
};

DateInput.defaultProps = {
	setDateTime: noop,
	onChange: noop,
	before: null,
	after: null,
	value: '',
};

export default DateInput;
