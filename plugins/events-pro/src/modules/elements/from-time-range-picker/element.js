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
	Row,
	Label,
	MultiDayCheckbox
} from '@moderntribe/events-pro/elements';
import { TribePropTypes } from '@moderntribe/common/utils';

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
	<Row className={ classNames(
		'tribe-editor__events-pro__row--from-time-range-picker',
		'tribe-editor__from-time-range-picker',
		className
	) }>
		<Label className="tribe-editor__from-time-range-picker__label">
			{ __( 'From', 'events-gutenberg' ) }
		</Label>
		<div className="tribe-editor__from-time-range-picker__content">
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
				// TODO: Add onChange handler
			/>
			<MultiDayCheckbox
				checked={ isMultiDay }
				onChange={ onMultiDayChange }
			/>
		</div>
	</Row>
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
