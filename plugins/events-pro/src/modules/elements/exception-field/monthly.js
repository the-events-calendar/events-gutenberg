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
	DayOfMonthPicker,
	RecurrenceTypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';

const MonthlyField = ( { isMultiDay } ) => {
	return (
		<Fragment>
			<RecurrenceTypePicker />
			<DayOfMonthPicker />
			<FromTimeRangePicker />
			{ isMultiDay && <RecurringToDateTimePicker /> }
			<SeriesEnds />
		</Fragment>
	);
};

MonthlyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
};

export default MonthlyField;
