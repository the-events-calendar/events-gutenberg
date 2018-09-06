/**
 * External dependencies
 */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

/**
 * Internal dependencies
 */
import { TimePicker } from '@moderntribe/common/elements';
import {
	moment as momentUtil,
	time,
	TribePropTypes,
} from '@moderntribe/common/utils';
import { FORMATS } from '@moderntribe/events/editor/utils/date';

class DateTimeRangePicker extends Component {
	constructor( props ) {
		super( props );
		this.toDayPickerInput = createRef();
	}

	getModifiers = () => {
		const { fromDate, toDate } = this.props;

		return {
			start: fromDate,
			end: toDate,
		};
	};

	getFromDayPickerInputProps = () => {
		const {
			fromDate,
			fromDateFormat,
			handleFromDateChange,
			shiftFocus,
			toDate,
		} = this.props;

		const props = {
			value: fromDate,
			format: fromDateFormat,
			formatDate: formatDate,
			parseDate: parseDate,
			dayPickerProps: {
				selectedDays: [ fromDate, { fromDate, toDate } ],
				disabledDays: { after: toDate },
				modifiers: this.getModifiers( fromDate, toDate ),
				toMonth: toDate,
				numberOfMonths: 1,
			},
			onDayChange: handleFromDateChange,
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
			handleToDateChange,
			shiftFocus,
			toDate,
			toDateFormat,
		} = this.props;

		const props = {
			value: toDate,
			format: toDateFormat,
			formatDate: formatDate,
			parseDate: parseDate,
			dayPickerProps: {
				selectedDays: [ fromDate, { fromDate, toDate } ],
				disabledDays: { before: fromDate },
				month: fromDate,
				fromMonth: fromDate,
				numberOfMonths: 1,
			},
			onDayChange: handleToDateChange,
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
			timeFormat: FORMATS.WP.time,
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
			timeFormat: FORMATS.WP.time,
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
			separatorDateTime,
			separatorTimeRange,
		} = this.props;

		return (
			<div className="tribe-editor__date-time-range-picker">
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
};

DateTimeRangePicker.defaultProps = {
	fromDateFormat: 'LL',
	handleFromDateChange: noop,
	handleToDateChange: noop,
	separatorDateTime: 'at',
	separatorTimeRange: 'to',
	toDateFormat: 'LL',
};

DateTimeRangePicker.propTypes = {
	fromDate: PropTypes.string,
	fromDateFormat: PropTypes.string,
	fromTime: TribePropTypes.timeFormat.isRequired,
	handleFromDateChange: PropTypes.func,
	handleToDateChange: PropTypes.func,
	isSameDay: PropTypes.bool,
	separatorDateTime: PropTypes.string,
	separatorTimeRange: PropTypes.string,
	shiftFocus: PropTypes.bool,
	toDate: PropTypes.string,
	toDateFormat: PropTypes.string,
	toTime: TribePropTypes.timeFormat.isRequired,
};

export default DateTimeRangePicker;
