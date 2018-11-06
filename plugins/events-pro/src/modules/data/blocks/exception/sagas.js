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
import * as sagas from '@moderntribe/events-pro/data/shared/sagas';
import * as ui from '@moderntribe/events-pro/data/ui';
import { SET_TIME_ZONE } from '@moderntribe/events/data/blocks/datetime/types';

export const sagaArgs = {
	actions: {
		add: actions.addException,
		sync: actions.syncException,
	},
	selectors,
};

export function* handleExceptionRemoval() {
	const exceptions = yield select( selectors.getExceptions );

	if ( ! exceptions.length ) {
		yield put( ui.actions.hideExceptionPanel() );
	}
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

export function* syncExceptions( action ) {
	const exceptions = yield select( selectors.getExceptions );

	for ( let i = 0; i < exceptions.length; i++ ) {
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
	yield takeEvery( [ types.REMOVE_EXCEPTION ], handleExceptionRemoval );
	yield takeEvery( [ types.ADD_EXCEPTION_FIELD ], sagas.handleAddition, sagaArgs );
	yield takeEvery( [ types.EDIT_EXCEPTION ], handleExceptionEdit );
	yield takeEvery( [ SET_TIME_ZONE ], syncExceptions );
}
