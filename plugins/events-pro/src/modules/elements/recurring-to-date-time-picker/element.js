/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	Row,
	Label,
	DayOfMonthPicker
} from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const RecurringToDateTimePicker = ( {
	className,
	endMonthDay,
	endWeekDay,
	onEndMonthDayChange,
	onEndWeekDayChange,
} ) => (
	<Row className={ classNames(
		'tribe-editor__events-pro__row--recurring-to-date-time-picker',
		'tribe-editor__recurring-to-date-time-picker',
		className
	) }>
		<Label className="tribe-editor__recurring-to-date-time-picker__label">
			{ __( 'To', 'events-gutenberg' ) }
		</Label>
		<div className="tribe-editor__recurring-to-date-time-picker__content">
			<DayOfMonthPicker
				dayOfMonth={ endMonthDay }
				onDayOfMonthChange={ onEndMonthDayChange }
				onWeekDayChange={ onEndWeekDayChange }
				weekDay={ endWeekDay }
			/>
		</div>
	</Row>
);

RecurringToDateTimePicker.propTypes = {
	className: PropTypes.string,
	endMonthDay: PropTypes.oneOf( options.MONTH_DAYS_OPTIONS ),
	endWeekDay: PropTypes.oneOf( options.DAYS_OF_THE_WEEK ),
	onEndMonthDayChange: PropTypes.func,
	onEndWeekDayChange: PropTypes.func,
};

export default RecurringToDateTimePicker;
