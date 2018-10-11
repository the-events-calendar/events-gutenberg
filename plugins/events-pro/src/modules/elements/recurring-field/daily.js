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
	RecurrenceTypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';

const DailyField = ( { isMultiDay } ) => {
	return (
		<Fragment>
			<RecurrenceTypePicker />
			<FromTimeRangePicker />
			{ isMultiDay && <RecurringToDateTimePicker /> }
			<SeriesEnds />
		</Fragment>
	);
};

DailyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
};

export default DailyField;
