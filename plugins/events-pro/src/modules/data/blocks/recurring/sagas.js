/**
 * External dependencies
 */
import { takeEvery, put, select, call } from 'redux-saga/effects';
import { keys } from 'lodash';

/**
 * Internal dependencies
 */
import * as constants from '@moderntribe/events-pro/data/blocks/constants';
import * as actions from './actions';
import * as selectors from './selectors';
import * as types from './types';
import * as ui from '@moderntribe/events-pro/data/ui';
import * as sagas from '@moderntribe/events-pro/data/shared/sagas';
import { SET_TIME_ZONE } from '@moderntribe/events/data/blocks/datetime/types';

export const sagaArgs = {
	actions: {
		add: actions.addRule,
		sync: actions.syncRule,
	},
	selectors,
};

export function* handleRuleRemoval() {
	const rules = yield select( selectors.getRules );

	if ( ! rules.length ) {
		yield put( ui.actions.hideRulePanel() );
	}
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
			case constants.KEY_START_TIME:
			case constants.KEY_END_TIME:
				yield call( sagas.handleTimeChange, sagaArgs, action, fieldKey );
				break;

			case constants.KEY_MULTI_DAY:
				yield call( sagas.handleMultiDayChange, sagaArgs, action, fieldKey );
				break;

			case constants.KEY_WEEK:
				yield call( sagas.handleWeekChange, sagaArgs, action, fieldKey );
				break;

			case constants.KEY_LIMIT_TYPE:
				yield call( sagas.handleLimitTypeChange, sagaArgs, action, fieldKey );
				break;
			default:
				break;
		}
	}
}

export function* syncRules( action ) {
	const rules = yield select( selectors.getRules );

	for ( let i = 0; i < rules.length; i++ ) {
		const _action = { index: i, ...action };
		switch ( action.type ) {
			case SET_TIME_ZONE:
				yield call( sagas.handleTimezoneChange, sagaArgs, _action, 'timeZone' );
				break;
			default:
				break;
		}
	}
}

export default function* watchers() {
	yield takeEvery( [ types.REMOVE_RULE ], handleRuleRemoval );
	yield takeEvery( [ types.ADD_RULE_FIELD ], sagas.handleAddition, sagaArgs );
	yield takeEvery( [ types.EDIT_RULE ], handleRuleEdit );
	yield takeEvery( [ SET_TIME_ZONE ], syncRules );
}
