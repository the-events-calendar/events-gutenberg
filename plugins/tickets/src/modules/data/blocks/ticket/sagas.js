/**
 * External Dependencies
 */
import { put, all, select, takeEvery } from 'redux-saga/effects';

/**
 * Internal dependencies
 */
import * as types from './types';
import * as actions from './actions';
import * as selectors from './selectors';

export function* setEditInTicketBlock( action ) {
	const { blockId } = action.payload;
	const currentId = yield select( selectors.getActiveBlockId );

	if ( currentId !== '' ) {
		yield put( actions.setTicketIsEditing( currentId, false ) );
	}

	yield all( [
		put( actions.setActiveChildBlockId( blockId ) ),
		put( actions.setTicketIsEditing( blockId, true ) ),
	] );
}

export function* removeActiveTicketBlock( action ) {
	const { blockId } = action.payload;
	const currentId = yield select( selectors.getActiveBlockId );

	if ( currentId === blockId ) {
		yield put( actions.setActiveChildBlockId( '' ) );
	}
}

export function* createNewTicket( action ) {
	const { blockId } = action.payload;
	const tmpSharedCapacity = yield select( selectors.getTmpSharedCapacity );
	const sharedValue = parseInt( tmpSharedCapacity, 10 );

	if ( ! isNaN( sharedValue ) && sharedValue > 0 ) {
		yield all( [
			put( actions.setTotalSharedCapacity( sharedValue ) ),
			put( actions.setTempSharedCapacity( '' ) ),
		] );
	}

	yield all( [
		put( actions.setActiveChildBlockId( '' ) ),
		put( actions.setTicketIsEditing( blockId, false ) ),
		put( actions.setTicketPostId( blockId, 99 ) ),
	] );
}

export function* updateActiveEditBlock( action ) {
	const { blockId, isEditing } = action.payload;

	if ( ! isEditing ) {
		return;
	}

	const currentId = yield select( selectors.getActiveBlockId );
	if ( currentId && currentId !== blockId ) {
		yield put( actions.setTicketIsEditing( currentId, false ) );
	}

	yield put( actions.setActiveChildBlockId( blockId ) );
}

export function* setDatePristine( action ) {
	const { blockId } = action.payload;
	yield put( actions.setTicketDateIsPristine( blockId, false ) );
}

export default function* watchers() {
	yield takeEvery( types.SET_TICKET_BLOCK_ID, setEditInTicketBlock );
	yield takeEvery( types.REMOVE_TICKET_BLOCK, removeActiveTicketBlock );
	yield takeEvery( types.SET_CREATE_NEW_TICKET, createNewTicket );
	yield takeEvery( types.SET_TICKET_IS_EDITING, updateActiveEditBlock );
	yield takeEvery( types.SET_TICKET_START_DATE, setDatePristine );
	yield takeEvery( types.SET_TICKET_END_DATE, setDatePristine );
	yield takeEvery( types.SET_TICKET_START_TIME, setDatePristine );
	yield takeEvery( types.SET_TICKET_END_TIME, setDatePristine );
}
