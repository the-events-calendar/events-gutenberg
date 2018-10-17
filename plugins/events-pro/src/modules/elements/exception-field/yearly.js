/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	FromTimeRangePicker,
	InMonth,
	DayOfMonthPicker,
	RecurrenceTypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';

const YearlyField = ( { isMultiDay } ) => {
	return (
		<Fragment>
			<RecurrenceTypePicker />
			<InMonth />
			<DayOfMonthPicker />
			<FromTimeRangePicker />
			{ isMultiDay && <RecurringToDateTimePicker /> }
			<SeriesEnds rowLabel={ __( 'Exception ends', 'events-gutenberg' ) } />
		</Fragment>
	);
};

YearlyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
};

export default YearlyField;
