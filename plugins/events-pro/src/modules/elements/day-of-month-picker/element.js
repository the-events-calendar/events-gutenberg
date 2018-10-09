/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Select from '@moderntribe/common/elements/select/element';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const DayOfMonthPicker = ( {
	dayOfMonth,
	onDayChange,
	onDayOfMonthChange,
	weekDay,
} ) => {
	const getPostfix = () => {
		const inWeekOfTheMonth = ! ! options.WEEKS_OF_THE_MONTH_OPTIONS.filter(
			( option ) => option.value === endDate.value
		).length
		let postfix;

		if ( inWeekOfTheMonth ) {
			postfix = (
				<Select
					backspaceRemovesValue={ false }
					value={ weekDay }
					isSearchable={ false }
					options={ options.DAYS_OF_THE_WEEK }
					onChange={ onDayChange }
				/>
			);
		} else {
			postfix = <span>{ __( 'of the month', 'events-gutenberg' ) }</span>;
		}

		return postfix;
	};

	return (
		<Fragment>
			<Select
				backspaceRemovesValue={ false }
				value={ dayOfMonth }
				isSearchable={ false }
				options={ options.MONTH_DAYS_OPTIONS }
				onChange={ onDayOfMonthChange }
			/>
			{ getPostfix() }
		</Fragment>
	);
};

DayOfMonthPicker.propTypes = {
	dayOfMonth: PropTypes.oneOf( options.MONTH_DAYS_OPTIONS ),
	onDayChange: PropTypes.func,
	onDayOfMonthChange: PropTypes.func,
	weekDay: PropTypes.oneOf( options.DAYS_OF_THE_WEEK ),
};

export default DayOfMonthPicker;
