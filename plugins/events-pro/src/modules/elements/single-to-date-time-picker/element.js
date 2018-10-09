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
import {
	Row,
	Label,
} from '@moderntribe/events-pro/elements';
import { TribePropTypes } from '@moderntribe/common/utils';

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
		<Row className={ classNames(
			'tribe-editor__events-pro__row--recurring-to-date-time-picker',
			'tribe-editor__recurring-to-date-time-picker',
			className
		) }>
			<Label className="tribe-editor__recurring-to-date-time-picker__label">
				{ __( 'To', 'events-gutenberg' ) }
			</Label>
			<div className="tribe-editor__recurring-to-date-time-picker__content">
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
			</div>
		</Row>
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
