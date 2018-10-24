/**
 * External dependencies
 */
import { takeLatest, takeEvery, take, put, select, call, cancel } from 'redux-saga/effects';
// import { updateBlockAttributes } from '@wordpress/editor/src/store/actions';

export const INITIALIZE_SYNC = 'INITIALIZE_SYNC';
export const CANCEL_SYNC = 'CANCEL_SYNC';

export function* serialize( payload ) {
	return yield call( [ JSON, 'stringify' ], payload );
}

export function* sync( { selector, metaField, setAttributes } ) {
	const state = yield select( selector );
	const payload = yield call( serialize, state );
	yield call( setAttributes, {
		[ metaField ]: payload,
	} );
}

export function* initialize( { listeners, selector, clientId, metaField, setAttributes } ) {
	const syncSaga = yield takeLatest( listeners, sync, { selector, metaField, setAttributes } );

	while ( true ) {
		const action = yield take( CANCEL_SYNC );
		if ( action.clientId === clientId ) {
			yield cancel( syncSaga );
			break;
		}
	}
}

export default function* watchers() {
	yield takeEvery( INITIALIZE_SYNC, initialize );
}
