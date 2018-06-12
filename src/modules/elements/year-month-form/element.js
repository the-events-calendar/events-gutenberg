/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import './style.pcss';

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const toMonth = new Date(currentYear + 10, 11);

const YearMonthForm = ({ date, localeUtils, onChange }) => {
	const months = localeUtils.getMonths();
	const years = [];

	for ( let i = currentYear; i <= toMonth.getFullYear(); i += 1 ) {
		years.push( i );
	}

	const handleChange = ( e ) => {
		const { year, month } = e.target.form;
		onChange( new Date( year.value, month.value ) );
	};

	return (
		<form className="DayPicker-Caption">
			<select className="DayPicker-Caption__month" name="month" onChange={ handleChange } value={ date.getMonth() }>
				{ months.map( ( month, monthNum ) => {
					if ( date.getFullYear() === currentYear && monthNum < currentMonth ) {
						return (
							<option key={ month } value={ monthNum } disabled>
								{ month }
							</option>
						);
					}

					return (
						<option key={ month } value={ monthNum }>
							{ month }
						</option>
					);
				} ) }
			</select>
			<select className="DayPicker-Caption__year" name="year" onChange={ handleChange } value={ date.getFullYear() }>
				{ years.map( year => {
					if ( date.getMonth() < currentMonth && year === currentYear ) {
						return (
							<option key={ year } value={ year } disabled>
								{ year }
							</option>
						)
					}

					return (
						<option key={ year } value={ year }>
							{ year }
						</option>
					)
				} ) }
			</select>
		</form>
	);
}

export default YearMonthForm;
