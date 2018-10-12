/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import { DatePicker } from '@moderntribe/events/elements';
import './style.pcss';

const DatePickerInput = ( props ) => {
	return (
		<div className="events-pro-date-picker-input">
			<DatePicker { ...props } />
		</div>
	);
};

DatePickerInput.propTypes = {};

export default DatePickerInput;
