/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import chrono from 'chrono-node';
import { debounce } from 'lodash';

/**
 * Internal dependencies
 */
import './style.pcss';
import { toDateTime, toMoment } from '@moderntribe/events/editor/utils/moment';

const parseValue = ( value, setDateTime ) => {
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

const debouncedParseValue = debounce( parseValue, 500 );

const handleChange = ( onChange, setDateTime ) => ( event ) => {
	const { value } = event.target;
	onChange( value );
	debouncedParseValue( value, setDateTime );
};

const DateInput = ( props ) => {
	const { value, onChange, setDateTime, before, after } = props;

	return (
		<div className="tribe-editor__date-input__container">
			{ before }
			<input
				type="text"
				name="date-input"
				className="tribe-editor__date-input"
				value={ value }
				onChange={ handleChange( onChange, setDateTime ) }
			/>
			{ after }
		</div>
	);
};

DateInput.propTypes = {
	setDateTime: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	before: PropTypes.node,
	after: PropTypes.node,
	value: PropTypes.string,
};

DateInput.defaultProps = {
	before: null,
	after: null,
	value: '',
};

export default DateInput;
