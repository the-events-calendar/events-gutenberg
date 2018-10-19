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
import { Select, TimePicker } from '@moderntribe/common/elements';
import { TribePropTypes } from '@moderntribe/common/utils';
import LabeledRow from '@moderntribe/events-pro/elements/labeled-row/element';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const RecurringToDateTimePicker = ( {
	className,
	endTime,
	onEndTimeChange,
	onEndTimeClick,
	onRecurringMultiDayChange,
	recurringMultiDay,
} ) => (
	<LabeledRow
		className={ classNames(
			'tribe-editor__recurring-to-date-time-picker',
			className
		) }
		label={ __( 'To', 'events-gutenberg' ) }
	>
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
		<Select
			className="tribe-editor__recurring-to-date-time-picker__select"
			backspaceRemovesValue={ false }
			value={ recurringMultiDay }
			isSearchable={ false }
			options={ options.RECURRING_MULTI_DAY_OPTIONS }
			onChange={ onRecurringMultiDayChange }
		/>
	</LabeledRow>
);

RecurringToDateTimePicker.propTypes = {
	className: PropTypes.string,
	endTime: TribePropTypes.timeFormat,
	onEndTimeChange: PropTypes.func,
	onEndTimeClick: PropTypes.func,
	onRecurringMultiDayChange: PropTypes.func,
	recurringMultiDay: PropTypes.oneOf( options.RECURRING_MULTI_DAY_OPTIONS ),
};

export default RecurringToDateTimePicker;
