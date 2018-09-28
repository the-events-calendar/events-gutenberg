/**
 * External Dependencies
 */
import { put, all, select, takeEvery, call } from 'redux-saga/effects';

/**
 * Internal dependencies
 */
import * as types from './types';
import * as actions from './actions';
import * as selectors from './selectors';
import {
	DEFAULT_STATE as DEFAULT_UI_STATE,
} from '@moderntribe/tickets/data/blocks/ticket/reducers/ui';
import { endpointUrl } from '@moderntribe/common/utils/api';

/**
 * @todo missing tests.
 */
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

/**
 * @todo missing tests.
 */
export function* removeActiveTicketBlock( action ) {
	const { blockId } = action.payload;
	const currentId = yield select( selectors.getActiveBlockId );

	if ( currentId === blockId ) {
		yield put( actions.setActiveChildBlockId( '' ) );
	}
}

/**
 * @todo missing tests.
 */
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

/**
 * @todo missing tests.
 */
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

export function* preventSharedNegative( action ) {
	const { sharedCapacity } = action.payload;
	const value = parseInt( sharedCapacity, 10 );
	if ( value < 0 ) {
		yield put( actions.setTotalSharedCapacity( 0 ) );
	}
}

export function* setDatePristine( action ) {
	const { blockId } = action.payload;
	yield put( actions.setTicketDateIsPristine( blockId, false ) );
}


/**
 * @todo missing tests.
 */
export function* getMedia( id ) {
	yield put( actions.setParentBlockIsLoading( true ) );
	try {
		const endpoint = endpointUrl( `/media/${ id }` );
		const response = yield call( fetch, endpoint );
		const media = yield call( [ response, 'json' ] );
		const header = {
			id: media.id,
			alt: media.alt_text,
			sizes: media.media_details.sizes,
		};
		yield put( actions.setHeader( header ) );
	} catch ( e ) {
		return null;
	} finally {
		yield put( actions.setParentBlockIsLoading( false ) );
	}
}

export function* setInitialState( action ) {
	const { get } = action.payload;

	const header = parseInt( get( 'header', DEFAULT_UI_STATE.header ), 10 ) || 0;

	const sharedCapacity = get( 'sharedCapacity' );

	// Meta value is '0' however fields use empty string as default
	if ( sharedCapacity !== '0' ) {
		yield put( actions.setTotalSharedCapacity( sharedCapacity ) );
	}

	if ( header > 0 ) {
		yield call( getMedia, header );
	}
}

export default function* watchers() {
	yield takeEvery( types.SET_TICKET_BLOCK_ID, setEditInTicketBlock );
	yield takeEvery( types.REMOVE_TICKET_BLOCK, removeActiveTicketBlock );
	yield takeEvery( types.SET_CREATE_NEW_TICKET, createNewTicket );
	yield takeEvery( types.SET_TICKET_IS_EDITING, updateActiveEditBlock );
	yield takeEvery( types.SET_TICKET_TOTAL_SHARED_CAPACITY, preventSharedNegative );
	yield takeEvery( types.SET_TICKET_START_DATE, setDatePristine );
	yield takeEvery( types.SET_TICKET_END_DATE, setDatePristine );
	yield takeEvery( types.SET_TICKET_START_TIME, setDatePristine );
	yield takeEvery( types.SET_TICKET_END_TIME, setDatePristine );
	yield takeEvery( types.SET_INITIAL_STATE, setInitialState );
}