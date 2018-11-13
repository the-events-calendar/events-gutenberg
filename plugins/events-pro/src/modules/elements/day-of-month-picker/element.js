/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { includes } from 'lodash';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Select } from '@moderntribe/common/elements';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';
import './style.pcss';

const DayOfMonthPicker = ( {
	className,
	dayOfMonth,
	onDayOfMonthChange,
	onWeekDayChange,
	weekDay,
} ) => {
	const getWeekDaySelect = () => {
		const inWeekOfTheMonth = includes( options.WEEKS_OF_THE_MONTH_OPTIONS, dayOfMonth );

		return inWeekOfTheMonth && (
			<Select
				className="tribe-editor__day-of-month-picker__week-day-select"
				backspaceRemovesValue={ false }
				value={ weekDay }
				isSearchable={ false }
				options={ options.DAYS_OF_THE_WEEK_OPTIONS }
				onChange={ onWeekDayChange }
			/>
		);
	};

	return (
		<div className={ classNames(
			'tribe-editor__day-of-month-picker',
			className,
		) }
		>
			<Select
				className="tribe-editor__day-of-month-picker__day-of-month-select"
				backspaceRemovesValue={ false }
				value={ dayOfMonth }
				isSearchable={ false }
				options={ options.MONTH_DAYS_OPTIONS }
				onChange={ onDayOfMonthChange }
			/>
			{ getWeekDaySelect() }
			<span>{ __( 'of the month', 'events-gutenberg' ) }</span>
		</div>
	);
};

DayOfMonthPicker.propTypes = {
	className: PropTypes.string,
	dayOfMonth: PropTypes.oneOf( options.MONTH_DAYS_OPTIONS ),
	onWeekDayChange: PropTypes.func,
	onDayOfMonthChange: PropTypes.func,
	weekDay: PropTypes.oneOf( options.DAYS_OF_THE_WEEK_OPTIONS ),
};

export default DayOfMonthPicker;
