/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { proptypes } from '@moderntribe/common/data/plugins';

/**
 * Internal dependencies
 */
import {
	FromTimeRangePicker,
	InMonth,
	DayOfMonthPicker,
	TypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const YearlyField = ( { isMultiDay, typeOption, onTypeChange } ) => {
	return (
		<Fragment>
			<TypePicker
				options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
				selected={ typeOption }
				onChange={ onTypeChange }
			/>
			<InMonth />
			<DayOfMonthPicker />
			<FromTimeRangePicker />
			{ isMultiDay && <RecurringToDateTimePicker /> }
			<SeriesEnds />
		</Fragment>
	);
};

YearlyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
	typeOption: proptypes.ReactSelectOption,
	onTypeChange: PropTypes.func.isRequired,
};

export default YearlyField;