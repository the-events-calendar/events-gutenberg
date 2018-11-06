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
	OnDayOfMonthPicker,
	TypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const YearlyField = ( { isMultiDay, index } ) => {
	return (
		<Fragment>
			<TypePicker
				blockType={ constants.RECURRING }
				index={ index }
				options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
				rowLabel={ __( 'Every', 'events-gutenberg' ) }
			/>
			<InMonth
				blockType={ constants.RECURRING }
				index={ index }
			/>
			<OnDayOfMonthPicker
				blockType={ constants.RECURRING }
				index={ index }
			/>
			<FromTimeRangePicker
				blockType={ constants.RECURRING }
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

YearlyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
};

export default YearlyField;
