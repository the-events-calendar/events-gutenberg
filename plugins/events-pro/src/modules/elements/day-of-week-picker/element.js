/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import DayOfWeek from './day-of-week/element';
import { constants } from '@moderntribe/events-pro/data/blocks/recurring';
import './style.pcss';

const {
	SUNDAY,
	MONDAY,
	TUESDAY,
	WEDNESDAY,
	THURSDAY,
	FRIDAY,
	SATURDAY,
	SUNDAY_LABEL,
	MONDAY_LABEL,
	TUESDAY_LABEL,
	WEDNESDAY_LABEL,
	THURSDAY_LABEL,
	FRIDAY_LABEL,
	SATURDAY_LABEL,
	SUNDAY_ABBR,
	MONDAY_ABBR,
	TUESDAY_ABBR,
	WEDNESDAY_ABBR,
	THURSDAY_ABBR,
	FRIDAY_ABBR,
	SATURDAY_ABBR,
} = constants;

const DayOfWeekPicker = ( {
	className,
	sundayChecked,
	mondayChecked,
	tuesdayChecked,
	wednesdayChecked,
	thursdayChecked,
	fridayChecked,
	saturdayChecked,
	onDayChange,
} ) => (
	<div className={ classNames( 'tribe-editor__day-of-week-picker', className ) }>
		<DayOfWeek
			checked={ sundayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--sunday"
			label={ SUNDAY_ABBR }
			labelTitle={ SUNDAY_LABEL }
			onChange={ onDayChange }
			value={ SUNDAY }
		/>
		<DayOfWeek
			checked={ mondayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--monday"
			label={ MONDAY_ABBR }
			labelTitle={ MONDAY_LABEL }
			onChange={ onDayChange }
			value={ MONDAY }
		/>
		<DayOfWeek
			checked={ tuesdayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--tuesday"
			label={ TUESDAY_ABBR }
			labelTitle={ TUESDAY_LABEL }
			onChange={ onDayChange }
			value={ TUESDAY }
		/>
		<DayOfWeek
			checked={ wednesdayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--wednesday"
			label={ WEDNESDAY_ABBR }
			labelTitle={ WEDNESDAY_LABEL }
			onChange={ onDayChange }
			value={ WEDNESDAY }
		/>
		<DayOfWeek
			checked={ thursdayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--thursday"
			label={ THURSDAY_ABBR }
			labelTitle={ THURSDAY_LABEL }
			onChange={ onDayChange }
			value={ THURSDAY }
		/>
		<DayOfWeek
			checked={ fridayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--friday"
			label={ FRIDAY_ABBR }
			labelTitle={ FRIDAY_LABEL }
			onChange={ onDayChange }
			value={ FRIDAY }
		/>
		<DayOfWeek
			checked={ saturdayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--saturday"
			label={ SATURDAY_ABBR }
			labelTitle={ SATURDAY_LABEL }
			onChange={ onDayChange }
			value={ SATURDAY }
		/>
	</div>
);

DayOfWeekPicker.propTypes = {
	className: PropTypes.string,
	sundayChecked: PropTypes.bool,
	mondayChecked: PropTypes.bool,
	tuesdayChecked: PropTypes.bool,
	wednesdayChecked: PropTypes.bool,
	thursdayChecked: PropTypes.bool,
	fridayChecked: PropTypes.bool,
	saturdayChecked: PropTypes.bool,
	onDayChange: PropTypes.func.isRequired,
};

export default DayOfWeekPicker;
