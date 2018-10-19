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
	TypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const DailyField = ( { index, isMultiDay } ) => {
	return (
		<Fragment>
			<TypePicker
				blockType={ constants.RECURRING }
				index={ index }
				options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
			/>
			<FromTimeRangePicker
				index={ index }
			/>
			{ isMultiDay && <RecurringToDateTimePicker index={ index } /> }
			<SeriesEnds
				blockType={ constants.RECURRING }
				index={ index }
			/>
		</Fragment>
	);
};

DailyField.propTypes = {
	index: PropTypes.number.isRequired,
	isMultiDay: PropTypes.bool.isRequired,
};

export default DailyField;
