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
	OnDayOfWeek,
	TypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const WeeklyField = ( { isMultiDay, typeOption, onTypeChange, index } ) => {
	return (
		<Fragment>
			<TypePicker
				options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
				selected={ typeOption }
				onChange={ onTypeChange }
				blockType={ constants.RECURRING }
				index={ index }
			/>
			<OnDayOfWeek />
			<FromTimeRangePicker
				index={ index }
			/>
			{ isMultiDay && <RecurringToDateTimePicker /> }
			<SeriesEnds
				blockType={ constants.RECURRING }
			/>
		</Fragment>
	);
};

WeeklyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
	typeOption: proptypes.ReactSelectOption,
	onTypeChange: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};

export default WeeklyField;
