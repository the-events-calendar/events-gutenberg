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
	RecurrenceTypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';

const DailyField = ( { index, isMultiDay } ) => {
	return (
		<Fragment>
			<RecurrenceTypePicker
				blockType={ constants.RECURRING }
				index={ index }
			/>
			<FromTimeRangePicker index={ index } />
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
