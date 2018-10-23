/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TimePicker, DayPickerInput } from '@moderntribe/common/elements';
import LabeledRow from '@moderntribe/events-pro/elements/labeled-row/element';
import { TribePropTypes } from '@moderntribe/common/utils';
import './style.pcss';

const SingleToDateTimePicker = ( {
	className,
	endDate,
	endDateFormat,
	endTime,
	onEndDateChange,
	onEndTimeChange,
	onEndTimeClick,
} ) => {
	const endDateObj = new Date( endDate );

	return (
		<LabeledRow
			className={ classNames(
				'tribe-editor__single-to-date-time-picker',
				className,
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
			<span>{ __( 'on', 'events-gutenberg' ) }</span>
			<DayPickerInput
				value={ endDate }
				format={ endDateFormat }
				formatDate={ formatDate }
				parseDate={ parseDate }
				dayPickerProps={ {
					modifiers: {
						start: endDateObj,
						end: endDateObj,
					},
				} }
				onDayChange={ onEndDateChange }
			/>
		</LabeledRow>
	);
};

SingleToDateTimePicker.propTypes = {
	className: PropTypes.string,
	endDate: PropTypes.string,
	endDateFormat: PropTypes.string,
	endTime: TribePropTypes.timeFormat,
	onEndDateChange: PropTypes.func,
	onEndTimeChange: PropTypes.func,
	onEndTimeClick: PropTypes.func,
};

SingleToDateTimePicker.defaultProps = {
	endDateFormat: 'LL',
};

export default SingleToDateTimePicker;
