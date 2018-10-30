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
import DayOfWeekPicker from '@moderntribe/events-pro/elements/day-of-week-picker/element';

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
			sundayChecked={ sundayChecked }
			mondayChecked={ mondayChecked }
			tuesdayChecked={ tuesdayChecked }
			wednesdayChecked={ wednesdayChecked }
			thursdayChecked={ thursdayChecked }
			fridayChecked={ fridayChecked }
			saturdayChecked={ saturdayChecked }
			onDayChange={ onDayChange }
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
