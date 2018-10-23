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
import LabeledRow from '@moderntribe/events-pro/elements/labeled-row/element';
import DayOfMonthPicker from '@moderntribe/events-pro/elements/day-of-month-picker/element';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const OnDayOfMonthPicker = ( {
	className,
	dayOfMonth,
	onDayOfMonthChange,
	onWeekDayChange,
	weekDay,
} ) => (
	<LabeledRow
		className={ classNames(
			'tribe-editor__on-day-of-month-picker',
			className
		) }
		label={ __( 'On the', 'events-gutenberg' ) }
	>
		<DayOfMonthPicker
			dayOfMonth={ dayOfMonth }
			onDayOfMonthChange={ onDayOfMonthChange }
			onWeekDayChange={ onWeekDayChange }
			weekDay={ weekDay }
			/>
	</LabeledRow>
);

OnDayOfMonthPicker.propTypes = {
	className: PropTypes.string,
	dayOfMonth: PropTypes.oneOf( options.MONTH_DAYS_OPTIONS ),
	onDayOfMonthChange: PropTypes.func,
	onWeekDayChange: PropTypes.func,
	weekDay: PropTypes.oneOf( options.DAYS_OF_THE_WEEK_OPTIONS ),
};

export default OnDayOfMonthPicker;
