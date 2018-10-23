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
	KEY_END_DATE,
	KEY_LIMIT,
	KEY_LIMIT_TYPE,
	KEY_BETWEEN,
	KEY_DAYS,
	KEY_WEEK,
	KEY_DAY,
	KEY_MONTH,
	KEY_TIMEZONE,
} = constants;

export function* handleAddition( { actions } ) {
	const start = yield select( datetime.getStart );
	const end = yield select( datetime.getEnd );
	const allDay = yield select( datetime.getAllDay );
	const multiDay = yield select( datetime.getMultiDay );
	const timezone = yield select( datetime.getTimeZone );

	const startMoment = momentUtil.toMoment( start );
	const endMoment = momentUtil.toMoment( end );

	const startDate = momentUtil.toDate( startMoment );
	const startTime = momentUtil.toTime24Hr( startMoment );
	const endDate = momentUtil.toDate( endMoment );
	const endTime = momentUtil.toTime24Hr( endMoment );

	yield put( actions.add( {
		[ KEY_TYPE ]: recurringConstants.SINGLE,
		[ KEY_ALL_DAY ]: allDay,
		[ KEY_MULTI_DAY ]: multiDay,
		[ KEY_START_DATE ]: startDate,
		[ KEY_START_TIME ]: startTime,
		[ KEY_END_DATE ]: endDate,
		[ KEY_END_TIME ]: endTime,
		[ KEY_BETWEEN ]: 1,
		[ KEY_LIMIT_TYPE ]: recurringConstants.COUNT,
		[ KEY_LIMIT ]: 7,
		[ KEY_DAYS ]: [],
		[ KEY_WEEK ]: recurringConstants.FIRST,
		[ KEY_DAY ]: 1,
		[ KEY_MONTH ]: [],
		[ KEY_TIMEZONE ]: timezone,
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
				[ KEY_END_TIME ]: '23:59:00',
			} )
		);
	} else {
		yield put(
			actions.sync( action.index, {
				[ KEY_ALL_DAY ]: isAllDay,
				[ key ]: time.fromSeconds( payloadTime, time.TIME_FORMAT_HH_MM ),
			} )
		);
	}
}

export function* handleMultiDayChange( { actions, selectors }, action, key ) {
	const isMultiDay = action.payload[ key ];

	if ( ! isMultiDay ) {
		const startTime = yield select( selectors.getStartTime, action );
		const endTime = yield select( selectors.getEndTime, action );

		let startTimeSeconds = time.toSeconds( startTime, time.TIME_FORMAT_HH_MM );
		let endTimeSeconds = time.toSeconds( endTime, time.TIME_FORMAT_HH_MM );

		// If end time is earlier than start time, fix time
		if ( endTimeSeconds <= startTimeSeconds ) {
			// If there is less than half an hour left in the day, roll back one hour
			if ( startTimeSeconds + time.HALF_HOUR_IN_SECONDS >= time.DAY_IN_SECONDS ) {
				startTimeSeconds -= time.HOUR_IN_SECONDS;
			}

			endTimeSeconds = startTimeSeconds + time.HALF_HOUR_IN_SECONDS;

			yield put(
				actions.sync( action.index, {
					[ KEY_START_TIME ]: (
						time.fromSeconds( startTimeSeconds, time.TIME_FORMAT_HH_MM )
					),
					[ KEY_END_TIME ]: (
						time.fromSeconds( endTimeSeconds, time.TIME_FORMAT_HH_MM )
					),
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
		const startMoment = yield call( momentUtil.toMoment, start );
		const startDate = yield call( momentUtil.toDate, startMoment.add( 1, 'day' ) );
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
