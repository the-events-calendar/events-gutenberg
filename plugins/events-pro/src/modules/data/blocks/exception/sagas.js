/**
 * External dependencies
 */
import { takeEvery, put, select } from 'redux-saga/effects';

/**
 * Internal dependencies
 */
import * as exception from '@moderntribe/events-pro/data/blocks/exception';
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';
import * as ui from '@moderntribe/events-pro/data/ui';
import { selectors as datetime } from '@moderntribe/events/data/blocks/datetime';

export function* handleExceptionRemoval() {
	const exceptions = yield select( exception.selectors.getExceptions );

	if ( ! exceptions.length ) {
		yield put( ui.actions.hideExceptionPanel() );
	}
}

export function* handleExceptionAddition() {
	const payload = yield select( datetime.datetimeSelector );
	yield put( exception.actions.addException( {
		type: recurring.constants.SINGLE,
		...payload,
	} ) );
}

export default function* watchers() {
	yield takeEvery( [ exception.types.REMOVE_EXCEPTION ], handleExceptionRemoval );
	yield takeEvery( [ exception.types.ADD_EXCEPTION_FIELD ], handleExceptionAddition );
}
