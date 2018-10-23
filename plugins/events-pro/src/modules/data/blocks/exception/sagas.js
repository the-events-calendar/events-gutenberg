/**
 * External dependencies
 */
import { takeEvery, put, select } from 'redux-saga/effects';

/**
 * Internal dependencies
 */
import * as actions from './actions';
import * as selectors from './selectors';
import * as types from './types';
import * as recurringConstants from '@moderntribe/events-pro/data/blocks/recurring/constants';
import * as ui from '@moderntribe/events-pro/data/ui';
import { selectors as datetime } from '@moderntribe/events/data/blocks/datetime';

export function* handleExceptionRemoval() {
	const exceptions = yield select( selectors.getExceptions );

	if ( ! exceptions.length ) {
		yield put( ui.actions.hideExceptionPanel() );
	}
}

export function* handleExceptionAddition() {
	const payload = yield select( datetime.datetimeSelector );
	yield put( actions.addException( {
		type: recurringConstants.SINGLE,
		...payload,
	} ) );
}

export default function* watchers() {
	yield takeEvery( [ types.REMOVE_EXCEPTION ], handleExceptionRemoval );
	yield takeEvery( [ types.ADD_EXCEPTION_FIELD ], handleExceptionAddition );
}
