/**
 * External Dependencies
 */
import { put, all, select, takeEvery, call } from 'redux-saga/effects';

/**
 * Wordpress dependencies
 */
import { select as wpSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import * as constants from './constants';
import * as types from './types';
import * as actions from './actions';
import * as selectors from './selectors';
import { DEFAULT_STATE } from './reducer';
import {
	DEFAULT_STATE as TICKET_DEFAULT_STATE,
} from './reducers/tickets/ticket';
import { wpREST } from '@moderntribe/common/utils/api';
import {
	tickets as ticketsConfig,
	restNonce,
} from '@moderntribe/common/src/modules/utils/globals';
import { getStart, getEnd } from '@moderntribe/events/data/blocks/datetime/selectors';
import { toMoment, toDate, toTime24Hr } from '@moderntribe/common/utils/moment';

const {
	UNLIMITED,
	SHARED,
	TICKET_TYPES,
	PROVIDER_CLASS_TO_PROVIDER_MAPPING,
} = constants;

/**
 * @todo missing tests.
 */
export function* setEditInTicketBlock( action ) {
	const { blockId } = action.payload;
	const currentId = yield select( selectors.getTicketsActiveChildBlockId );
	const hasBeenCreated = yield select( selectors.getTicketHasBeenCreated, { blockId } );

	if ( hasBeenCreated ) {
		return;
	}

	yield all( [
		put( actions.setTicketsActiveChildBlockId( blockId ) ),
	] );
}

/**
 * @todo missing tests.
 */
export function* removeActiveTicketBlock( action ) {
	const { blockId } = action.payload;
	const currentId = yield select( selectors.getTicketsActiveChildBlockId );

	if ( currentId === blockId ) {
		yield put( actions.setTicketsActiveChildBlockId( '' ) );
	}

	const hasBeenCreated = yield select( selectors.getTicketHasBeenCreated, { blockId } );

	if ( ! hasBeenCreated ) {
		yield put( actions.removeTicketBlock( blockId ) );
		return;
	}

	const ticketId = yield select( selectors.getTicketId, { blockId } );
	const { remove_ticket_nonce = '' } = restNonce();

	const postId = wpSelect( 'core/editor' ).getCurrentPostId();
	/**
	 * Encode params to be passed into the DELETE request as PHP doesn’t transform the request body
	 * of a DELETE request into a super global.
	 */
	const body = [
		`${ encodeURIComponent( 'post_id' ) }=${ encodeURIComponent( postId ) }`,
		`${ encodeURIComponent( 'remove_ticket_nonce' ) }=${ encodeURIComponent( remove_ticket_nonce ) }`,
	];

	try {
		yield all( [
			put( actions.setTicketsIsParentBlockLoading( true ) ),
			put( actions.setTicketIsLoading( blockId, true ) ),
		] );
		yield call( wpREST, {
			path: `tickets/${ ticketId }`,
			namespace: 'tribe/tickets/v1',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			initParams: {
				method: 'DELETE',
				body: body.join( '&' ),
			},
		} );
		yield put( actions.removeTicketBlock( blockId ) );
	} catch ( e ) {
		/**
		 * @todo handle error on removal
		 */
	} finally {
		yield put( actions.setTicketsIsParentBlockLoading( false ) );
	}
}

export function* setBodyDetails( blockId ) {
	const body = new FormData();
	const props = { blockId };

	body.append( 'post_id', wpSelect( 'core/editor' ).getCurrentPostId() );
	body.append( 'provider', yield select( selectors.getTicketsProvider ) );
	body.append( 'name', yield select( selectors.getTicketTitle, props ) );
	body.append( 'description', yield select( selectors.getTicketDescription, props ) );
	body.append( 'price', yield select( selectors.getTicketPrice, props ) );
	body.append( 'start_date', yield select( selectors.getTicketStartDate, props ) );
	body.append( 'start_time', yield select( selectors.getTicketStartTime, props ) );
	body.append( 'sku', yield select( selectors.getTicketSku, props ) );

	const expires = yield select( selectors.getTicketExpires, props );
	if ( expires ) {
		body.append( 'end_date', yield select( selectors.getTicketEndDate, props ) );
		body.append( 'end_time', yield select( selectors.getTicketEndTime, props ) );
	}

	const capacity = {
		type: yield select( selectors.getTicketCapacityType, props ),
		amount: yield select( selectors.getTicketCapacity, props ),
	};

	const isUnlimited = capacity.type === TICKET_TYPES[ UNLIMITED ];
	body.append( 'ticket[mode]', isUnlimited ? '' : capacity.type );
	body.append( 'ticket[capacity]', isUnlimited ? '' : capacity.amount );

	if ( capacity.type === TICKET_TYPES[ SHARED ] ) {
		body.append( 'ticket[event_capacity]', yield select( selectors.getTicketsSharedCapacity ) );
	}

	return body;
}

/**
 * @todo missing tests.
 */
export function* createNewTicket( action ) {
	const { blockId } = action.payload;

	yield call( setGlobalSharedCapacity );
	const { add_ticket_nonce = '' } = restNonce();
	const body = yield call( setBodyDetails, blockId );
	body.append( 'add_ticket_nonce', add_ticket_nonce );

	try {
		yield put( actions.setTicketIsLoading( blockId, true ) );
		const ticket = yield call( wpREST, {
			path: 'tickets/',
			namespace: 'tribe/tickets/v1',
			initParams: {
				method: 'POST',
				body,
			},
		} );

		yield all( [
			put( actions.setTicketId( blockId, ticket.ID ) ),
			put( actions.setTicketHasBeenCreated( blockId, true ) ),
			put( actions.setTicketsActiveChildBlockId( '' ) ),
			put( actions.setTicketAvailable( blockId, ticket.capacity ) ),
			put( actions.setTicketProvider( blockId, PROVIDER_CLASS_TO_PROVIDER_MAPPING[ ticket.provider_class ] ) ),
		] );
	} catch ( e ) {
		/**
		 * @todo: handle error scenario
		 */
	} finally {
		yield all( [
			put( actions.setTicketIsLoading( blockId, false ) ),
		] );
	}
}

/**
 * @todo missing tests.
 */
export function* updateActiveEditBlock( action ) {
	const { blockId, isEditing } = action.payload;

	if ( ! isEditing ) {
		return;
	}

	const currentId = yield select( selectors.getTicketsActiveChildBlockId );

	yield put( actions.setTicketsActiveChildBlockId( blockId ) );
}

/**
 * @todo missing tests.
 */
export function* getMedia( id ) {
	yield put( actions.setTicketsIsParentBlockLoading( true ) );
	try {
		const media = yield call( wpREST, { path: `media/${ id }` } );
		const header = {
			id: media.id,
			alt: media.alt_text,
			sizes: media.media_details.sizes,
		};
		yield put( actions.setTicketsHeader( header ) );
	} catch ( e ) {
		/**
		 * @todo: handle error scenario
		 */
	} finally {
		yield put( actions.setTicketsIsParentBlockLoading( false ) );
	}
}

export function* setInitialState( action ) {
	const { get } = action.payload;

	const header = parseInt( get( 'header', DEFAULT_STATE.header ), 10 ) || 0;
	const sharedCapacity = get( 'sharedCapacity' );

	// Meta value is '0' however fields use empty string as default
	if ( sharedCapacity !== '0' ) {
		yield put( actions.setTicketsSharedCapacity( sharedCapacity ) );
	}

	if ( header > 0 ) {
		yield call( getMedia, header );
	}

	const tickets = ticketsConfig();
	const defaultProvider = tickets.default_provider || '';
	const provider = get( 'provider', DEFAULT_STATE.provider );
	yield put( actions.setTicketsProvider( provider || defaultProvider ) );
}

export function* setTicketInitialState( action ) {
	const { clientId, get } = action.payload;
	const values = {
		ticketId: get( 'ticketId', TICKET_DEFAULT_STATE.ticketId ),
		hasBeenCreated: get( 'hasBeenCreated', TICKET_DEFAULT_STATE.hasBeenCreated ),
		dateIsPristine: get( 'dateIsPristine', ! TICKET_DEFAULT_STATE.expires ),
	};

	const start = yield select(getStart);
	const end = yield select(getEnd);

	const startMoment = yield call( toMoment, start );
	const endMoment = yield call( toMoment, end );
 	const startDate = yield call( toDate, startMoment );
	const endDate = yield call( toDate, endMoment );
 	const startTime = yield call( toTime24Hr, startMoment );
	const endTime = yield call( toTime24Hr, endMoment );

	const sharedCapacity = yield select( selectors.getTicketsSharedCapacityInt );

	if (sharedCapacity) {
		yield put( actions.setTicketCapacity( clientId, sharedCapacity ) );
	}

	yield all( [
		put( actions.setTicketHasBeenCreated( clientId, values.hasBeenCreated ) ),
		put( actions.setTicketId( clientId, values.ticketId ) ),
		put( actions.setTicketExpires( clientId, ! values.dateIsPristine ) ),
		put( actions.setTicketStartDate( clientId, startDate ) ),
		put( actions.setTicketStartTime( clientId, startTime ) ),
		put( actions.setTicketEndDate( clientId, endDate ) ),
		put( actions.setTicketEndTime( clientId, endTime ) ),
		put( actions.fetchTicket( clientId, values.ticketId ) ),
	] );
}

export function* fetchTicketDetails( action ) {
	const { ticketId = 0, blockId } = action.payload;

	yield put( actions.setTicketIsLoading( blockId, true ) );

	try {
		if ( ticketId === 0 ) {
			return;
		}

		const ticket = yield call( wpREST, {
			path: `tickets/${ ticketId }`,
			namespace: 'tribe/tickets/v1',
		} );

		const costDetails = ticket.cost_details || {};
		const costValues = costDetails.values || [];
		const { totals = {} } = ticket;

		yield all( [
			put( actions.setTicketTitle( blockId, ticket.title ) ),
			put( actions.setTicketDescription( blockId, ticket.description ) ),
			put( actions.setTicketCapacity( blockId, ticket.capacity ) ),
			put( actions.setTicketPrice( blockId, costValues[ 0 ] ) ),
			put( actions.setTicketSku( blockId, ticket.sku ) ),
			put( actions.setTicketCapacityType( blockId, ticket.capacity_type ) ),
			put( actions.setTicketSold( blockId, totals.sold ) ),
			put( actions.setTicketAvailable( blockId, totals.stock ) ),
			put( actions.setTicketCurrencySymbol( blockId, ticket.cost_details.currency_symbol ) ),
			put( actions.setTicketProvider( blockId, ticket.provider ) ),
		] );
	} catch ( e ) {
		/**
		 * @todo handle error scenario
		 */
	} finally {
		yield put( actions.setTicketIsLoading( blockId, false ) );
	}
}

export function* cancelEditTicket( action ) {
	const { blockId } = action.payload;
	const ticketId = yield select( selectors.getTicketId, { blockId } );

	yield all( [
		put( actions.setTicketsActiveChildBlockId( '' ) ),
		put( actions.fetchTicket( blockId, ticketId ) ),
	] );
}

export function* setGlobalSharedCapacity() {
	const tmpSharedCapacity = yield select( selectors.getTicketsTempSharedCapacity );
	const sharedValue = parseInt( tmpSharedCapacity, 10 );

	if ( ! isNaN( sharedValue ) && sharedValue > 0 ) {
		yield all( [
			put( actions.setTicketsSharedCapacity( sharedValue ) ),
		] );
	}
}

export function* updateTicket( action ) {
	const { blockId } = action.payload;

	const { edit_ticket_nonce = '' } = restNonce();
	const body = yield call( setBodyDetails, blockId );
	body.append( 'edit_ticket_nonce', edit_ticket_nonce );

	yield call( setGlobalSharedCapacity );
	const ticketId = yield select( selectors.getTicketId, { blockId } );

	try {
		const data = [];
		for ( const pair of body.entries() ) {
			data.push( `${ encodeURIComponent( pair[ 0 ] ) }=${ encodeURIComponent( pair[ 1 ] ) }` );
		}

		yield all( [
			put( actions.setTicketIsLoading( blockId, true ) ),
			call( wpREST, {
				path: `tickets/${ ticketId }`,
				namespace: 'tribe/tickets/v1',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				},
				initParams: {
					method: 'PUT',
					body: data.join( '&' ),
				},
			} ),
		] );
	} catch ( e ) {
		/**
		 * @todo: handle error scenario
		 */
		yield put( actions.fetchTicket( blockId, ticketId ) );
	} finally {
		yield all( [
			put( actions.setTicketIsLoading( blockId, false ) ),
			put( actions.setTicketsActiveChildBlockId( '' ) ),
		] );
	}
}

export default function* watchers() {
	// yield takeEvery( types.SET_TICKET_BLOCK_ID, setEditInTicketBlock );
	yield takeEvery( types.DELETE_TICKET, removeActiveTicketBlock );
	yield takeEvery( types.CREATE_NEW_TICKET, createNewTicket );
	// yield takeEvery( types.SET_TICKET_IS_EDITING, updateActiveEditBlock );
	yield takeEvery( types.SET_TICKETS_INITIAL_STATE, setInitialState );
	yield takeEvery( types.SET_TICKET_INITIAL_STATE, setTicketInitialState );
	yield takeEvery( types.FETCH_TICKET, fetchTicketDetails );
	yield takeEvery( types.UPDATE_TICKET, updateTicket );
}
