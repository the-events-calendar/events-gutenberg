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
import {
	LabeledRow,
	MultiDayCheckbox,
} from '@moderntribe/events-pro/elements';
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
} ) => (
	<LabeledRow
		className={ classNames(
			'tribe-editor__from-time-range-picker',
			{ 'tribe-editor__from-time-range-picker--multi-day': isMultiDay },
			className
		) }
		label={ __( 'From', 'events-gutenberg' ) }
	>
		<TimePicker
			current={ startTime }
			// TODO: logic to handle start and end times
			start="00:00"
			end="23:59"
			onChange={ onStartTimeChange }
			onClick={ onStartTimeClick }
			// TODO: Add onChange handler
		/>
		<span>{ __( 'to', 'events-gutenberg' ) }</span>
		<TimePicker
			current={ endTime }
			// TODO: logic to handle start and end times
			start="00:00"
			end="23:59"
			onChange={ onEndTimeChange }
			onClick={ onEndTimeClick }
			disabled={ isMultiDay }
			// TODO: Add onChange handler
		/>
		<MultiDayCheckbox
			className="tribe-editor__from-time-range-picker__multi-day-checkbox"
			checked={ isMultiDay }
			onChange={ onMultiDayChange }
		/>
	</LabeledRow>
);

FromTimeRangePicker.propTypes = {
	className: PropTypes.string,
	endTime: TribePropTypes.timeFormat,
	onEndTimeChange: PropTypes.func,
	onEndTimeClick: PropTypes.func,
	onStartTimeChange: PropTypes.func,
	onStartTimeClick: PropTypes.func,
	startTime: TribePropTypes.timeFormat,
};

export default FromTimeRangePicker;
