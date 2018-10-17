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
	OnDayOfWeek,
	RecurrenceTypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';

const WeeklyField = ( { isMultiDay } ) => {
	return (
		<Fragment>
			<RecurrenceTypePicker />
			<OnDayOfWeek />
			<FromTimeRangePicker />
			{ isMultiDay && <RecurringToDateTimePicker /> }
			<SeriesEnds rowLabel={ __( 'Exception ends', 'events-gutenberg' ) } />
		</Fragment>
	);
};

WeeklyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
};

export default WeeklyField;
