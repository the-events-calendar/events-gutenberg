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
import * as constants from '@moderntribe/events-pro/data/blocks/recurring/constants';
import './style.pcss';

const DayOfWeekPicker = ( {
	className,
	sundayChecked,
	mondayChecked,
	tuesdayChecked,
	wednesdayChecked,
	thursdayChecked,
	fridayChecked,
	saturdayChecked,
	onSundayChange,
	onMondayChange,
	onTuesdayChange,
	onWednesdayChange,
	onThursdayChange,
	onFridayChange,
	onSaturdayChange,
} ) => (
	<div className={ classNames( 'tribe-editor__day-of-week-picker', className ) }>
		<DayOfWeek
			checked={ sundayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--sunday"
			label={ constants.SUNDAY_ABBR }
			labelTitle={ constants.SUNDAY_LABEL }
			onChange={ onSundayChange }
		/>
		<DayOfWeek
			checked={ mondayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--monday"
			label={ constants.MONDAY_ABBR }
			labelTitle={ constants.MONDAY_LABEL }
			onChange={ onMondayChange }
		/>
		<DayOfWeek
			checked={ tuesdayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--tuesday"
			label={ constants.TUESDAY_ABBR }
			labelTitle={ constants.TUESDAY_LABEL }
			onChange={ onTuesdayChange }
		/>
		<DayOfWeek
			checked={ wednesdayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--wednesday"
			label={ constants.WEDNESDAY_ABBR }
			labelTitle={ constants.WEDNESDAY_LABEL }
			onChange={ onWednesdayChange }
		/>
		<DayOfWeek
			checked={ thursdayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--thursday"
			label={ constants.THURSDAY_ABBR }
			labelTitle={ constants.THURSDAY_LABEL }
			onChange={ onThursdayChange }
		/>
		<DayOfWeek
			checked={ fridayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--friday"
			label={ constants.FRIDAY_ABBR }
			labelTitle={ constants.FRIDAY_LABEL }
			onChange={ onFridayChange }
		/>
		<DayOfWeek
			checked={ saturdayChecked }
			className="tribe-editor__day-of-week-picker__day tribe-editor__day-of-week-picker__day--saturday"
			label={ constants.SATURDAY_ABBR }
			labelTitle={ constants.SATURDAY_LABEL }
			onChange={ onSaturdayChange }
		/>
	</div>
);

DayOfWeekPicker.propTypes = {
	className: PropTypes.string,
	sundayChecked: PropTypes.bool.isRequired,
	mondayChecked: PropTypes.bool.isRequired,
	tuesdayChecked: PropTypes.bool.isRequired,
	wednesdayChecked: PropTypes.bool.isRequired,
	thursdayChecked: PropTypes.bool.isRequired,
	fridayChecked: PropTypes.bool.isRequired,
	saturdayChecked: PropTypes.bool.isRequired,
	onSundayChange: PropTypes.func.isRequired,
	onMondayChange: PropTypes.func.isRequired,
	onTuesdayChange: PropTypes.func.isRequired,
	onWednesdayChange: PropTypes.func.isRequired,
	onThursdayChange: PropTypes.func.isRequired,
	onFridayChange: PropTypes.func.isRequired,
	onSaturdayChange: PropTypes.func.isRequired,
};

export default DayOfWeekPicker;
