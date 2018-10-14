/**
 * External dependencies
 */
import { takeEvery, put, select } from 'redux-saga/effects';
import uniqid from 'uniqid';

/**
 * Internal dependencies
 */
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';
import * as ui from '@moderntribe/events-pro/data/ui';
import { selectors as datetime } from '@moderntribe/events/data/blocks/datetime';

export function* handleRuleRemoval() {
	const rules = yield select( recurring.selectors.getRules );

	if ( ! rules.length ) {
		yield put( ui.actions.hideRulePanel() );
	}
}

export function* handleRuleAddition() {
	const payload = yield select( datetime.datetimeSelector );
	yield put( recurring.actions.addRule( {
		id: uniqid(),
		type: recurring.constants.SINGLE,
		...payload,
	} ) );
}

export default function* watchers() {
	yield takeEvery( [ recurring.types.REMOVE_RULE ], handleRuleRemoval );
	yield takeEvery( [ recurring.types.ADD_RULE_FIELD ], handleRuleAddition );
}
