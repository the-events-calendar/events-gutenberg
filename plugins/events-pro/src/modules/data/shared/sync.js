/**
 * External dependencies
 */
import { takeLatest, takeEvery, take, select, call, cancel } from 'redux-saga/effects';
import { PREFIX_EVENTS_PRO_STORE } from '@moderntribe/events-pro/data/prefix';

export const INITIALIZE_SYNC = `${ PREFIX_EVENTS_PRO_STORE }/INITIALIZE_SYNC`;
export const CANCEL_SYNC = `${ PREFIX_EVENTS_PRO_STORE }/CANCEL_SYNC`;

export function* serialize( payload ) {
	return yield call( [ JSON, 'stringify' ], payload );
}

export function* sync( { selector, metaField, setAttributes, current } ) {
	const state = yield select( selector );
	const payload = yield call( serialize, state );
	
	if ( current === payload ) {
		return;
	}

	yield call( setAttributes, {
		[ metaField ]: payload,
	} );
}

export function* initialize( { listeners, selector, clientId, metaField, setAttributes, current } ) {
	const syncSaga = yield takeLatest( listeners, sync, { selector, metaField, setAttributes, current } );

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
