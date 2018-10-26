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
	TypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const WeeklyField = ( { isMultiDay, index } ) => {
	return (
		<Fragment>
			<TypePicker
				blockType={ constants.RECURRING }
				index={ index }
				options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
				rowLabel={ __( 'Every', 'events-gutenberg' ) }
			/>
			<OnDayOfWeek
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

WeeklyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
};

export default WeeklyField;
