/**
 * External dependencies
 */
import { takeEvery, put, select } from 'redux-saga/effects';

/**
 * Internal dependencies
 */
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';
import * as ui from '@moderntribe/events-pro/data/ui';
import { moment as momentUtil } from '@moderntribe/common/utils';
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

export default function* watchers() {
	yield takeEvery( [ recurring.types.REMOVE_RULE ], handleRuleRemoval );
	yield takeEvery( [ recurring.types.ADD_RULE_FIELD ], handleRuleAddition );
}
