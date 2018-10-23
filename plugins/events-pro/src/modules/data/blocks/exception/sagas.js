/**
 * External dependencies
 */
import { takeEvery, put, select, call } from 'redux-saga/effects';
import { keys } from 'lodash';

/**
 * Internal dependencies
 */
import { constants } from '@moderntribe/events-pro/data/blocks';
import * as actions from './actions';
import * as selectors from './selectors';
import * as types from './types';
import * as recurringConstants from '@moderntribe/events-pro/data/blocks/recurring/constants';
import * as ui from '@moderntribe/events-pro/data/ui';
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

export function* handleExceptionRemoval() {
	const exceptions = yield select( selectors.getExceptions );

	if ( ! exceptions.length ) {
		yield put( ui.actions.hideExceptionPanel() );
	}
}

export function* handleExceptionAddition() {
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

	yield put( actions.addException( {
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

export function* handleExceptionEdit( action ) {
	// Prevent rule syncs from looping
	if ( action.sync ) {
		return;
	}

	const fieldKeys = yield call( keys, action.payload );

	for ( let i = 0; i < fieldKeys.length; i++ ) {
		const fieldKey = fieldKeys[ i ];

		switch ( fieldKey ) {
			case constants.KEY_START_TIME:
			case constants.KEY_END_TIME:
				yield call( handleTimeChange, action, fieldKey );
				break;

			case constants.KEY_MULTI_DAY:
				yield call( handleMultiDayChange, action, fieldKey );
				break;

			default:
				break;
		}
	}
}

export function* handleTimeChange( action, key ) {
	const payloadTime = action.payload[ key ];
	const isAllDay = payloadTime === 'all-day';

	if ( isAllDay ) {
		yield put(
			actions.syncException( action.index, {
				all_day: isAllDay,
				start_time: '00:00:00',
				end_time: '23:59:00',
			} )
		);
	} else {
		yield put(
			actions.syncException( action.index, {
				all_day: isAllDay,
				[ key ]: time.fromSeconds( payloadTime, time.TIME_FORMAT_HH_MM ),
			} )
		);
	}
}

export function* handleMultiDayChange( action, key ) {
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
				actions.syncException( action.index, {
					[ constants.KEY_START_TIME ]: (
						time.fromSeconds( startTimeSeconds, time.TIME_FORMAT_HH_MM )
					),
					[ constants.KEY_END_TIME ]: (
						time.fromSeconds( endTimeSeconds, time.TIME_FORMAT_HH_MM )
					),
				} )
			);
		}
	}
}

export function* handleWeekChange( action, key ) {
	const payloadWeek = action.payload[ key ];
	const weekWasNull = ! ( yield select( selectors.getWeek, action ) );

	if ( payloadWeek && weekWasNull ) {
		yield put(
			actions.syncException( action.index, {
				[ key ]: payloadWeek,
				[ KEY_DAY ]: 1,
			} )
		);
	}
}

export default function* watchers() {
	yield takeEvery( [ types.REMOVE_EXCEPTION ], handleExceptionRemoval );
	yield takeEvery( [ types.ADD_EXCEPTION_FIELD ], handleExceptionAddition );
	yield takeEvery( [ types.EDIT_EXCEPTION ], handleExceptionEdit );
}
