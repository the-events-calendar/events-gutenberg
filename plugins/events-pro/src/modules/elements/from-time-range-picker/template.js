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
import { TimePicker } from '@moderntribe/common/elements';
import LabeledRow from '@moderntribe/events-pro/elements/labeled-row/element';
import MultiDayCheckbox from '@moderntribe/events-pro/elements/multi-day-checkbox/element';
import { TribePropTypes } from '@moderntribe/common/utils';
import './style.pcss';

const FromTimeRangePicker = ( {
	className,
	endTime,
	isMultiDay,
	onEndTimeChange,
	onEndTimeClick,
	onMultiDayChange,
	onStartTimeChange,
	onStartTimeClick,
	startTime,
} ) => {
	return (
		<LabeledRow
			className={ classNames(
				'tribe-editor__from-time-range-picker',
				{ 'tribe-editor__from-time-range-picker--multi-day': isMultiDay },
				className
			) }
			label={ __( 'From', 'events-gutenberg' ) }
		>
			{ /* @todo: set start and end time, set min and max, and all day */ }
			<TimePicker
				current={ startTime }
				start="00:00"
				end="23:59"
				onChange={ onStartTimeChange }
				onClick={ onStartTimeClick }
			/>
			{ /* @todo: remove span and timepicker if all day */ }
			<span>{ __( 'to', 'events-gutenberg' ) }</span>
			{ /* @todo: set start and end time, set min and max, and all day */ }
			<TimePicker
				current={ endTime }
				start="00:00"
				end="23:59"
				onChange={ onEndTimeChange }
				onClick={ onEndTimeClick }
				disabled={ isMultiDay }
			/>
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
	onEndTimeChange: PropTypes.func,
	onEndTimeClick: PropTypes.func,
	onStartTimeChange: PropTypes.func,
	onStartTimeClick: PropTypes.func,
	onMultiDayChange: PropTypes.func,
	startTime: TribePropTypes.timeFormat,
	isMultiDay: PropTypes.bool,
};

export default FromTimeRangePicker;
