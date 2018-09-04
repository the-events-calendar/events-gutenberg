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
	roundTime,
	toMoment,
	isSameDay,
} from '@moderntribe/events/editor/utils/moment';
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
			from,
			onFromTimePickerChange,
			onFromTimePickerClick,
			to,
		} = this.props;
		const _fromMoment = toMoment( from );
		const _toMoment = toMoment( to );
		const props = {
			current: _fromMoment,
			start: _fromMoment.clone().startOf( 'day' ),
			end: _fromMoment.clone().endOf( 'day' ),
			onChange: onFromTimePickerChange,
			onClick: onFromTimePickerClick,
			timeFormat: FORMATS.WP.time,
		}

		if ( isSameDay( _fromMoment, _toMoment ) ) {
			props.end = roundTime( _toMoment.clone().subtract( 1, 'minutes' ) );
			props.max = _toMoment.clone().subtract( 1, 'minutes' );
		}
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
					<TimePicker />
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
}

DateTimeRangePicker.propTypes = {
	from: PropTypes.string,
	fromDate: PropTypes.string,
	fromDateFormat: PropTypes.string,
	fromTime: PropTypes.string,
	handleFromDateChange: PropTypes.func,
	handleToDateChange: PropTypes.func,
	separatorDateTime: PropTypes.string,
	separatorTimeRange: PropTypes.string,
	shiftFocus: PropTypes.bool,
	to: PropTypes.string,
	toDate: PropTypes.string,
	toDateFormat: PropTypes.string,
	toTime: PropTypes.string,
};

export default DateTimeRangePicker;
