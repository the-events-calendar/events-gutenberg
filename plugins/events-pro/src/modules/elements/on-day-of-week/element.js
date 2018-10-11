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
import { LabeledRow, DayOfWeekPicker } from '@moderntribe/events-pro/elements';

const OnDayOfWeek = ( {
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
	<LabeledRow
		className={ classNames(
			'tribe-editor__on-day-of-week',
			className
		) }
		label={ __( 'On', 'events-gutenberg' ) }
	>
		<DayOfWeekPicker
			// TODO: handle checked and on day change
			sundayChecked={ sundayChecked }
			mondayChecked={ mondayChecked }
			tuesdayChecked={ tuesdayChecked }
			wednesdayChecked={ wednesdayChecked }
			thursdayChecked={ thursdayChecked }
			fridayChecked={ fridayChecked }
			saturdayChecked={ saturdayChecked }
			onSundayChange={ onDayChange }
			onMondayChange={ onDayChange }
			onTuesdayChange={ onDayChange }
			onWednesdayChange={ onDayChange }
			onThursdayChange={ onDayChange }
			onFridayChange={ onDayChange }
			onSaturdayChange={ onDayChange }
		/>
	</LabeledRow>
);

OnDayOfWeek.propTypes = {
	className: PropTypes.string,
	sundayChecked: PropTypes.bool,
	mondayChecked: PropTypes.bool,
	tuesdayChecked: PropTypes.bool,
	wednesdayChecked: PropTypes.bool,
	thursdayChecked: PropTypes.bool,
	fridayChecked: PropTypes.bool,
	saturdayChecked: PropTypes.bool,
	onDayChange: PropTypes.func,
};

export default OnDayOfWeek;
