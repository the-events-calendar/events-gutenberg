/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TimePicker } from '@moderntribe/common/elements';
import LabeledRow from '@moderntribe/events-pro/elements/labeled-row/element';
import MultiDayCheckbox from '@moderntribe/events-pro/elements/multi-day-checkbox/element';
import { TribePropTypes, time, moment as momentUtil } from '@moderntribe/common/utils';
import './style.pcss';

const {
	MINUTE_IN_SECONDS,
	HALF_HOUR_IN_SECONDS,
	DAY_IN_SECONDS,
	START_OF_DAY,
	END_OF_DAY,
	TIME_FORMAT_HH_MM,
	toSeconds,
	fromSeconds,
} = time;

const FromTimeRangePicker = ( {
	className,
	endTime,
	isAllDay,
	isMultiDay,
	onEndTimeChange,
	onEndTimeClick,
	onMultiDayChange,
	onStartTimeChange,
	onStartTimeClick,
	startTime,
} ) => {
	const getStartTimePickerProps = () => {
		const props = {
			current: startTime,
			onChange: onStartTimeChange,
			onClick: onStartTimeClick,
			start: START_OF_DAY,
			end: END_OF_DAY,
			showAllDay: false,
			allDay: isAllDay,
		};
		return props;
	};

	const getEndTimePickerProps = () => {
		const props = {
			current: endTime,
			onChange: onEndTimeChange,
			onClick: onEndTimeClick,
			start: START_OF_DAY,
			end: END_OF_DAY,
			disabled: isMultiDay,
			showAllDay: false,
			allDay: isAllDay,
		};
		return props;
	};

	return (
		<LabeledRow
			className={ classNames(
				'tribe-editor__from-time-range-picker',
				{ 'tribe-editor__from-time-range-picker--multi-day': isMultiDay },
				className
			) }
			label={ __( 'From', 'events-gutenberg' ) }
		>
			<TimePicker { ...getStartTimePickerProps() } />
			{ ! isAllDay && (
				<Fragment>
					<span>{ __( 'to', 'events-gutenberg' ) }</span>
					<TimePicker { ...getEndTimePickerProps() } />
				</Fragment>
			) }
			<MultiDayCheckbox
				className="tribe-editor__from-time-range-picker__multi-day-checkbox"
				checked={ isMultiDay }
				onChange={ onMultiDayChange }
			/>
		</LabeledRow>

	);
};

FromTimeRangePicker.propTypes = {
	className: PropTypes.string,
	endTime: TribePropTypes.timeFormat,
	isAllDay: PropTypes.bool,
	isMultiDay: PropTypes.bool,
	onEndTimeChange: PropTypes.func,
	onEndTimeClick: PropTypes.func,
	onMultiDayChange: PropTypes.func,
	onStartTimeChange: PropTypes.func,
	onStartTimeClick: PropTypes.func,
	startTime: TribePropTypes.timeFormat,
};

export default FromTimeRangePicker;
