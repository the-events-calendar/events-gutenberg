/**
 * External dependencies
 */
import { takeEvery, put, select } from 'redux-saga/effects';

/**
 * Internal dependencies
 */
import { selectors, types } from '@moderntribe/events-pro/data/blocks/recurring';
import { actions } from '@moderntribe/events-pro/data/ui';

export function* handleRuleRemoval() {
	const rules = yield select( selectors.getRules );

	if ( ! rules.length ) {
		yield put( actions.hideRulePanel() );
	}
}

export default function* watchers() {
	yield takeEvery( [ types.REMOVE_RECURRING_FIELD ], handleRuleRemoval );
}
