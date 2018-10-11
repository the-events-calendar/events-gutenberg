/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import {
	FromTimeRangePicker,
	OnDatePicker,
	RecurrenceTypePicker,
	SingleToDateTimePicker,
} from '@moderntribe/events-pro/elements';

const SingularField = ( { isMultiDay } ) => {
	return (
		<Fragment>
			<RecurrenceTypePicker />
			<OnDatePicker />
			<FromTimeRangePicker />
			{ isMultiDay && <SingleToDateTimePicker /> }
		</Fragment>
	);
};

SingularField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
};

export default SingularField;
