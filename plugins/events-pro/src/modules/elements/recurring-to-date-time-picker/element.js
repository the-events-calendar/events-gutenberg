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
import { TimePicker } from '@moderntribe/common/elements';
import {
	Row,
	Label,
	DayOfMonthPicker
} from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';
import { TribePropTypes } from '@moderntribe/common/utils';

const RecurringToDateTimePicker = ( {
	className,
	endMonthDay,
	endWeekDay,
	endTime,
	onEndMonthDayChange,
	onEndTimeChange,
	onEndTimeClick,
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
			<TimePicker
				current={ endTime }
				// TODO: logic to handle start and end times
				start="00:00"
				end="23:59"
				onChange={ onEndTimeChange }
				onClick={ onEndTimeClick }
				// TODO: Add onChange handler
			/>
			<span>{ __( 'on the', 'events-gutenberg' ) }</span>
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
	endTime: TribePropTypes.timeFormat,
	onEndMonthDayChange: PropTypes.func,
	onEndTimeChange: PropTypes.func,
	onEndTimeClick: PropTypes.func,
	onEndWeekDayChange: PropTypes.func,
};

export default RecurringToDateTimePicker;
