/**
 * External dependencies
 */
import { takeEvery, put, select } from 'redux-saga/effects';

/**
 * Internal dependencies
 */
import { selectors, types } from '@moderntribe/events-pro/data/blocks/exception';
import { actions } from '@moderntribe/events-pro/data/ui';

export function* handleExceptionRemoval() {
	const exceptions = yield select( selectors.getExceptions );

	if ( ! exceptions.length ) {
		yield put( actions.hideExceptionPanel() );
	}
}

export default function* watchers() {
	yield takeEvery( [ types.REMOVE_EXCEPTION_FIELD ], handleExceptionRemoval );
}
