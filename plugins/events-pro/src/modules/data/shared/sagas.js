/**
 * External dependencies
 */
import { put, select, call } from 'redux-saga/effects';

/**
 * Internal dependencies
 */
import * as constants from '@moderntribe/events-pro/data/blocks/constants';
import * as recurringConstants from '@moderntribe/events-pro/data/blocks/recurring/constants';
import { moment as momentUtil, time } from '@moderntribe/common/utils';
import { selectors as datetime } from '@moderntribe/events/data/blocks/datetime';

const {
	KEY_TYPE,
	KEY_ALL_DAY,
	KEY_MULTI_DAY,
	KEY_START_TIME,
	KEY_END_TIME,
	KEY_START_DATE,
	KEY_START_DATE_INPUT,
	KEY_START_DATE_OBJ,
	KEY_END_DATE,
	KEY_END_DATE_INPUT,
	KEY_END_DATE_OBJ,
	KEY_LIMIT,
	KEY_LIMIT_DATE_INPUT,
	KEY_LIMIT_DATE_OBJ,
	KEY_LIMIT_TYPE,
	KEY_BETWEEN,
	KEY_DAYS,
	KEY_WEEK,
	KEY_DAY,
	KEY_MONTH,
	KEY_TIMEZONE,
	KEY_MULTI_DAY_SPAN,
} = constants;

const {
	toMoment,
	toDate,
	toDatabaseDate,
	toDatabaseTime,
} = momentUtil;

const {
	HALF_HOUR_IN_SECONDS,
	HOUR_IN_SECONDS,
	DAY_IN_SECONDS,
	TIME_FORMAT_HH_MM,
	toSeconds,
	fromSeconds,
} = time;

export function* handleAddition( { actions } ) {
	const start = yield select( datetime.getStart );
	const end = yield select( datetime.getEnd );
	const allDay = yield select( datetime.getAllDay );
	const multiDay = yield select( datetime.getMultiDay );
	const timezone = yield select( datetime.getTimeZone );

	const startMoment = yield call( toMoment, start );
	const endMoment = yield call( toMoment, end );

	const startDate = yield call( toDatabaseDate, startMoment );
	const startTime = yield call( toDatabaseTime, startMoment );
	const endDate = yield call( toDatabaseDate, endMoment );
	const endTime = yield call( toDatabaseTime, endMoment );

	const startDateInput = yield call( toDate, startMoment );
	const startDateObj = new Date( startDateInput );
	const endDateInput = yield call( toDate, endMoment );
	const endDateObj = new Date( endDateInput );

	yield put( actions.add( {
		[ KEY_TYPE ]: recurringConstants.SINGLE,
		[ KEY_ALL_DAY ]: allDay,
		[ KEY_MULTI_DAY ]: multiDay,
		[ KEY_START_DATE ]: startDate,
		[ KEY_START_DATE_INPUT]: startDateInput,
		[ KEY_START_DATE_OBJ]: startDateObj,
		[ KEY_START_TIME ]: startTime,
		[ KEY_END_DATE ]: endDate,
		[ KEY_END_DATE_INPUT ]: endDateInput,
		[ KEY_END_DATE_OBJ ]: endDateObj,
		[ KEY_END_TIME ]: endTime,
		[ KEY_BETWEEN ]: 1,
		[ KEY_LIMIT_TYPE ]: recurringConstants.COUNT,
		[ KEY_LIMIT ]: 7,
		[ KEY_LIMIT_DATE_INPUT ]: endDateInput,
		[ KEY_LIMIT_DATE_OBJ ]: endDateObj,
		[ KEY_DAYS ]: [],
		[ KEY_WEEK ]: recurringConstants.FIRST,
		[ KEY_DAY ]: 1,
		[ KEY_MONTH ]: [],
		[ KEY_TIMEZONE ]: timezone,
		[ KEY_MULTI_DAY_SPAN ]: recurringConstants.NEXT_DAY,
	} ) );
}

export function* handleTimeChange( { actions }, action, key ) {
	const payloadTime = action.payload[ key ];
	const isAllDay = payloadTime === 'all-day';

	if ( isAllDay ) {
		yield put(
			actions.sync( action.index, {
				[ KEY_ALL_DAY ]: isAllDay,
				[ KEY_START_TIME ]: '00:00:00',
				[ KEY_END_TIME ]: '23:59:59',
			} )
		);
	} else {
		yield put(
			actions.sync( action.index, {
				[ KEY_ALL_DAY ]: isAllDay,
				[ key ]: `${ payloadTime }:00`,
			} )
		);
	}
}

export function* handleMultiDayChange( { actions, selectors }, action, key ) {
	const isMultiDay = action.payload[ key ];

	if ( ! isMultiDay ) {
		const startTime = yield select( selectors.getStartTimeNoSeconds, action );
		const endTime = yield select( selectors.getEndTimeNoSeconds, action );

		let startTimeSeconds = yield call( toSeconds, startTime, TIME_FORMAT_HH_MM );
		let endTimeSeconds = yield call( toSeconds, endTime, TIME_FORMAT_HH_MM );

		// If end time is earlier than start time, fix time
		if ( endTimeSeconds <= startTimeSeconds ) {
			// If there is less than half an hour left in the day, roll back one hour
			if ( startTimeSeconds + HALF_HOUR_IN_SECONDS >= DAY_IN_SECONDS ) {
				startTimeSeconds -= HOUR_IN_SECONDS;
			}

			endTimeSeconds = startTimeSeconds + HALF_HOUR_IN_SECONDS;

			const adjustedStartTime = yield call( fromSeconds, startTimeSeconds, TIME_FORMAT_HH_MM );
			const adjustedEndTime = yield call( fromSeconds, endTimeSeconds, TIME_FORMAT_HH_MM )

			yield put(
				actions.sync( action.index, {
					[ KEY_START_TIME ]: `${ adjustedStartTime }:00`,
					[ KEY_END_TIME ]: `${ adjustedEndTime }:00`,
				} )
			);
		}
	}
}

export function* handleWeekChange( { actions, selectors }, action, key ) {
	const payloadWeek = action.payload[ key ];
	const weekWasNull = ! ( yield select( selectors.getWeek, action ) );

	if ( payloadWeek && weekWasNull ) {
		yield put(
			actions.sync( action.index, {
				[ key ]: payloadWeek,
				[ KEY_DAY ]: 1,
			} )
		);
	}
}

export function* handleLimitTypeChange( { actions }, action, key ) {
	const value = action.payload[ key ];
	const isDate = value === recurringConstants.DATE;
	const isCount = value === recurringConstants.COUNT;

	if ( isDate ) {
		const start = yield select( datetime.getStart );
		const startMoment = yield call( toMoment, start );
		const startDate = yield call( toDate, startMoment.add( 1, 'day' ) );
		yield put(
			actions.sync( action.index, {
				[ constants.KEY_LIMIT ]: startDate,
			} )
		);
	} else if ( isCount ) {
		yield put(
			actions.sync( action.index, {
				[ constants.KEY_LIMIT ]: 1,
			} )
		);
	} else {
		// Never ending
		yield put(
			actions.sync( action.index, {
				[ constants.KEY_LIMIT ]: null,
			} )
		);
	}
}

export function* handleTimezoneChange( { actions }, action, key ) {
	yield put(
		actions.sync( action.index, {
			[ constants.KEY_TIMEZONE ]: action.payload[ key ],
		} )
	);
}
