/**
 * External dependencies
 */
import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

/**
 * Internal dependencies
 */
import { TimePicker } from '@moderntribe/common/elements';
import {
	date,
	time,
	TribePropTypes,
} from '@moderntribe/common/utils';
import './style.pcss';

/**
 * @todo rename onClick property for something more meaningful like, onSelectedTime
 */

class DateTimeRangePicker extends Component {
	/**
	 * @todo remove the need to specify the: fromDate, fromTime, toDate, toTime
	 */
	static defaultProps = {
		fromDateFormat: 'LL',
		onFromDateChange: noop,
		onToDateChange: noop,
		separatorDateTime: 'at',
		separatorTimeRange: 'to',
		toDateFormat: 'LL',
	};

	static propTypes = {
		className: PropTypes.string,
		fromDate: PropTypes.string,
		fromDateFormat: PropTypes.string,
		fromTime: TribePropTypes.timeFormat.isRequired,
		isSameDay: PropTypes.bool,
		onFromDateChange: PropTypes.func,
		onFromTimePickerChange: PropTypes.func,
		onFromTimePickerClick: PropTypes.func,
		onToDateChange: PropTypes.func,
		onToTimePickerChange: PropTypes.func,
		onToTimePickerClick: PropTypes.func,
		separatorDateTime: PropTypes.string,
		separatorTimeRange: PropTypes.string,
		shiftFocus: PropTypes.bool,
		toDate: PropTypes.string,
		toDateFormat: PropTypes.string,
		toTime: TribePropTypes.timeFormat.isRequired,
	};

	constructor( props ) {
		super( props );
		this.toDayPickerInput = createRef();
	}

	getFromDayPickerInputProps = () => {
		const {
			fromDate,
			fromDateFormat,
			onFromDateChange,
			shiftFocus,
			toDate,
		} = this.props;

		const from = new Date( fromDate );
		const to = new Date( toDate );

		const props = {
			value: fromDate,
			format: fromDateFormat,
			formatDate: formatDate,
			parseDate: parseDate,
			dayPickerProps: {
				selectedDays: [ from, { from, to } ],
				disabledDays: { after: to },
				modifiers: {
					start: from,
					end: to,
				},
				toMonth: to,
			},
			onDayChange: onFromDateChange,
		};

		/**
		 * If shiftFocus is true, selection of date on fromDayPickerInput
		 * automatically focuses on toDayPickerInput
		 */
		if ( shiftFocus ) {
			props.dayPickerProps.onDayClick = () => (
				this.toDayPickerInput.current.focus()
			);
		}

		return props;
	};

	getToDayPickerInputProps = () => {
		const {
			fromDate,
			onToDateChange,
			shiftFocus,
			toDate,
			toDateFormat,
		} = this.props;

		const from = new Date( fromDate );
		const to = new Date( toDate );

		const props = {
			value: toDate,
			format: toDateFormat,
			formatDate: formatDate,
			parseDate: parseDate,
			dayPickerProps: {
				selectedDays: [ from, { from, to } ],
				disabledDays: { before: from },
				modifiers: {
					start: from,
					end: to,
				},
				month: from,
				fromMonth: from,
			},
			onDayChange: onToDateChange,
		};

		/**
		 * If shiftFocus is true, selection of date on fromDayPickerInput
		 * automatically focuses on toDayPickerInput
		 */
		if ( shiftFocus ) {
			props.ref = this.toDayPickerInput;
		}

		return props;
	};

	getFromTimePickerProps = () => {
		const {
			fromTime,
			isSameDay,
			onFromTimePickerChange,
			onFromTimePickerClick,
			toTime,
		} = this.props;

		const props = {
			current: fromTime,
			start: time.START_OF_DAY,
			end: time.END_OF_DAY,
			onChange: onFromTimePickerChange,
			onClick: onFromTimePickerClick,
			timeFormat: date.FORMATS.WP.time,
		};

		if ( isSameDay ) {
			// subtract one minute from toTime
			const maxTime = time.fromSeconds(
				time.toSeconds( toTime, time.TIME_FORMAT_HH_MM ) - time.MINUTE_IN_SECONDS,
				time.TIME_FORMAT_HH_MM,
			);
			props.end = time.roundTime( maxTime, time.TIME_FORMAT_HH_MM );
			props.max = maxTime;
		}

		return props;
	};

	getToTimePickerProps = () => {
		const {
			fromTime,
			isSameDay,
			onToTimePickerChange,
			onToTimePickerClick,
			toTime,
		} = this.props;

		const props = {
			current: toTime,
			start: time.START_OF_DAY,
			end: time.END_OF_DAY,
			onChange: onToTimePickerChange,
			onClick: onToTimePickerClick,
			timeFormat: date.FORMATS.WP.time,
		};

		if ( isSameDay ) {
			// if the start time has less than half an hour left in the day
			if ( ( time.DAY_IN_SECONDS - time.toSeconds( fromTime ) ) <= time.HALF_HOUR_IN_SECONDS ) {
				props.start = time.END_OF_DAY;
			} else {
				// add 30 minutes to fromTime and round time to closest 30 min interval
				props.start = time.roundTime(
					time.fromSeconds(
						time.toSeconds( fromTime, time.TIME_FORMAT_HH_MM ) + time.HALF_HOUR_IN_SECONDS,
						time.TIME_FORMAT_HH_MM,
					),
					time.TIME_FORMAT_HH_MM,
				);
			}
			props.min = time.fromSeconds(
				time.toSeconds( fromTime, time.TIME_FORMAT_HH_MM ) + time.MINUTE_IN_SECONDS,
				time.TIME_FORMAT_HH_MM,
			);
		}

		return props;
	};

	render() {
		const {
			className,
			separatorDateTime,
			separatorTimeRange,
		} = this.props;

		return (
			<div className={ classNames( 'tribe-editor__date-time-range-picker', className ) }>
				<div className="tribe-editor__date-time-range-picker__start">
					<DayPickerInput { ...this.getFromDayPickerInputProps() } />
					<span
						className={ classNames(
							'tribe-editor__date-time-range-picker__separator',
							'tribe-editor__date-time-range-picker__separator--date-time',
						) }
					>
						{ separatorDateTime }
					</span>
					<TimePicker { ...this.getFromTimePickerProps() } />
				</div>
				<div className="tribe-editor__date-time-range-picker__end">
					<span
						className={ classNames(
							'tribe-editor__date-time-range-picker__separator',
							'tribe-editor__date-time-range-picker__separator--time-range',
						) }
					>
						{ separatorTimeRange }
					</span>
					<DayPickerInput { ...this.getToDayPickerInputProps() } />
					<span
						className={ classNames(
							'tribe-editor__date-time-range-picker__separator',
							'tribe-editor__date-time-range-picker__separator--date-time',
						) }
					>
						{ separatorDateTime }
					</span>
					<TimePicker { ...this.getToTimePickerProps() } />
				</div>
			</div>
		)
	}
}

export default DateTimeRangePicker;
