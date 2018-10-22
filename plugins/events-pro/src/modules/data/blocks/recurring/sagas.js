/**
 * External dependencies
 */
import { takeEvery, put, select, call, all } from 'redux-saga/effects';
import { keys } from 'lodash';

/**
 * Internal dependencies
 */
import * as blocks from '@moderntribe/events-pro/data/blocks';
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';
import * as ui from '@moderntribe/events-pro/data/ui';
import { moment as momentUtil, time } from '@moderntribe/common/utils';
import { selectors as datetime } from '@moderntribe/events/data/blocks/datetime';

export function* handleRuleRemoval() {
	const rules = yield select( recurring.selectors.getRules );

	if ( ! rules.length ) {
		yield put( ui.actions.hideRulePanel() );
	}
}

export function* handleRuleAddition() {
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

	yield put( recurring.actions.addRule( {
		type: recurring.constants.SINGLE,
		all_day: allDay,
		multi_day: multiDay,
		start_date: startDate,
		start_time: startTime,
		end_date: endDate,
		end_time: endTime,
		between: 1,
		limit_type: recurring.constants.COUNT,
		limit: 7,
		days: [],
		week: recurring.constants.FIRST,
		day: 1,
		month: [],
		timezone,
	} ) );
}

export function* handleRuleEdit( action ) {
	// Prevent rule syncs from looping
	if ( action.sync ) {
		return;
	}

	const fieldKeys = yield call( keys, action.payload );

	for ( let i = 0; i < fieldKeys.length; i++ ) {
		const fieldKey = fieldKeys[ i ];

		switch ( fieldKey ) {
			case blocks.constants.KEY_START_TIME:
			case blocks.constants.KEY_END_TIME:
				yield call( handleTimeChange, action, fieldKey );
				break;

			case blocks.constants.KEY_MULTI_DAY:
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
			recurring.actions.syncRule( action.index, {
				all_day: isAllDay,
				start_time: '00:00:00',
				end_time: '23:59:00',
			} )
		);
	} else {
		yield put(
			recurring.actions.syncRule( action.index, {
				all_day: isAllDay,
				[ key ]: time.fromSeconds( payloadTime, time.TIME_FORMAT_HH_MM ),
			} )
		);
	}
}

export function* handleMultiDayChange( action, key ) {
	const isMultiDay = action.payload[ key ];

	if ( ! isMultiDay ) {
		const startTime = yield select( recurring.selectors.getStartTime, action );
		const endTime = yield select( recurring.selectors.getEndTime, action );

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
				recurring.actions.syncRule( action.index, {
					[ blocks.constants.KEY_START_TIME ]: (
						time.fromSeconds( startTimeSeconds, time.TIME_FORMAT_HH_MM )
					),
					[ blocks.constants.KEY_END_TIME ]: (
						time.fromSeconds( endTimeSeconds, time.TIME_FORMAT_HH_MM )
					),
				} )
			);
		}
	}
}

export default function* watchers() {
	yield takeEvery( [ recurring.types.REMOVE_RULE ], handleRuleRemoval );
	yield takeEvery( [ recurring.types.ADD_RULE_FIELD ], handleRuleAddition );
	yield takeEvery( [ recurring.types.EDIT_RULE ], handleRuleEdit );
}
