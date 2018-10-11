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
	InMonth,
	OnDayOfMonthPicker,
	RecurrenceTypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';

const YearlyField = ( { isMultiDay } ) => {
	return (
		<Fragment>
			<RecurrenceTypePicker />
			<InMonth />
			<OnDayOfMonthPicker />
			<FromTimeRangePicker />
			{ isMultiDay && <RecurringToDateTimePicker /> }
			<SeriesEnds />
		</Fragment>
	);
};

YearlyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
};

export default YearlyField;
