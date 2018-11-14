/**
 * External Dependencies
 */
import { put, all, select, takeEvery, call } from 'redux-saga/effects';
import moment from 'moment/moment';

/**
 * Wordpress dependencies
 */
import { select as wpSelect, dispatch as wpDispatch } from '@wordpress/data';

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

export function* setBodyDetails( blockId ) {
	const body = new FormData();
	const props = { blockId };

	body.append( 'post_id', wpSelect( 'core/editor' ).getCurrentPostId() );
	body.append( 'provider', yield select( selectors.getTicketsTempProvider ) );
	body.append( 'name', yield select( selectors.getTicketTempTitle, props ) );
	body.append( 'description', yield select( selectors.getTicketTempDescription, props ) );
	body.append( 'price', yield select( selectors.getTicketTempPrice, props ) );
	body.append( 'start_date', yield select( selectors.getTicketTempStartDate, props ) );
	body.append( 'start_time', yield select( selectors.getTicketTempStartTime, props ) );
	body.append( 'end_date', yield select( selectors.getTicketTempEndDate, props ) );
	body.append( 'end_time', yield select( selectors.getTicketTempEndTime, props ) );
	body.append( 'sku', yield select( selectors.getTicketTempSku, props ) );

	const capacityType = yield select( selectors.getTicketTempCapacityType, props );
	const capacity = yield select( selectors.getTicketTempCapacity, props );

	const isUnlimited = capacityType === TICKET_TYPES[ UNLIMITED ];
	body.append( 'ticket[mode]', isUnlimited ? '' : capacityType );
	body.append( 'ticket[capacity]', isUnlimited ? '' : capacity );

	if ( capacityType === TICKET_TYPES[ SHARED ] ) {
		body.append( 'ticket[event_capacity]', yield select( selectors.getTicketsTempSharedCapacity ) );
	}

	return body;
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

export function* cancelEditTicket( action ) {
	const { blockId } = action.payload;
	const ticketId = yield select( selectors.getTicketId, { blockId } );

	yield all( [
		put( actions.setTicketsActiveChildBlockId( '' ) ),
		put( actions.fetchTicket( blockId, ticketId ) ),
	] );
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
	};

	const publishDate = wpSelect( 'core/editor' ).getEditedPostAttribute( 'date' );
	const startMoment = yield call( momentUtil.toMoment, publishDate );
	const startDate = yield call( momentUtil.toDatabaseDate, startMoment );
	const startDateInput = yield call( momentUtil.toDate, startMoment );
	const startTime = yield call( momentUtil.toDatabaseTime, startMoment );

	yield all( [
		put( actions.setTicketStartDate( clientId, startDate ) ),
		put( actions.setTicketStartDateInput( clientId, startDateInput ) ),
		put( actions.setTicketStartDateMoment( clientId, startMoment ) ),
		put( actions.setTicketStartTime( clientId, startTime ) ),
		put( actions.setTicketTempStartDate( clientId, startDate ) ),
		put( actions.setTicketTempStartDateInput( clientId, startDateInput ) ),
		put( actions.setTicketTempStartDateMoment( clientId, startMoment ) ),
		put( actions.setTicketTempStartTime( clientId, startTime ) ),
	] );

	try {
		// NOTE: This requires TEC to be installed, if not installed, do not set an end date
		const eventEnd = yield select( getEnd ); // Ticket purchase window should end when event ends
		const endMoment = yield call( momentUtil.toMoment, eventEnd );
		const endDate = yield call( momentUtil.toDatabaseDate, endMoment );
		const endDateInput = yield call( momentUtil.toDate, endMoment );
		const endTime = yield call( momentUtil.toDatabaseTime, endMoment );

		yield all( [
			put( actions.setTicketEndDate( clientId, endDate ) ),
			put( actions.setTicketEndDateInput( clientId, endDateInput ) ),
			put( actions.setTicketEndDateMoment( clientId, endMoment ) ),
			put( actions.setTicketEndTime( clientId, endTime ) ),
			put( actions.setTicketTempEndDate( clientId, endDate ) ),
			put( actions.setTicketTempEndDateInput( clientId, endDateInput ) ),
			put( actions.setTicketTempEndDateMoment( clientId, endMoment ) ),
			put( actions.setTicketTempEndTime( clientId, endTime ) ),
		] );
	} catch ( err ) {
		// ¯\_(ツ)_/¯
	}

	const sharedCapacity = yield select( selectors.getTicketsSharedCapacity );
	if ( sharedCapacity ) {
		yield all( [
			put( actions.setTicketCapacity( clientId, sharedCapacity ) ),
			put( actions.setTicketTempCapacity( clientId, sharedCapacity ) ),
		] );
	}

	yield all( [
		put( actions.setTicketId( clientId, values.ticketId ) ),
		put( actions.fetchTicket( clientId, values.ticketId ) ),
	] );
}

export function* fetchTicket( action ) {
	const { ticketId, blockId } = action.payload;

	yield put( actions.setTicketIsLoading( blockId, true ) );

	if ( ticketId === 0 ) {
		return;
	}

	try {
		const ticket = yield call( wpREST, {
			path: `tickets/${ ticketId }`,
			namespace: 'tribe/tickets/v1',
		} );

		const costDetails = ticket.cost_details || {};
		const costValues = costDetails.values || [];
		const {
			totals = {},
			available_from,
			available_until,
			cost_details,
			provider,
		} = ticket;

		const startMoment = yield call( moment, available_from );
		const startDate = yield call( momentUtil.toDatabaseDate, startMoment );
		const startDateInput = yield call( momentUtil.toDate, startMoment );
		const startTime = yield call( momentUtil.toDatabaseTime, startMoment );

		let endMoment = yield call( moment, '' );
		let endDate = '';
		let endDateInput = '';
		let endTime = '';

		if ( available_until ) {
			endMoment = yield call( moment, available_until );
			endDate = yield call( momentUtil.toDatabaseDate, endMoment );
			endDateInput = yield call( momentUtil.toDate, endMoment );
			endTime = yield call( momentUtil.toDatabaseTime, endMoment );
		}

		const details = {
			title: ticket.title,
			description: ticket.description,
			price: costValues[ 0 ],
			sku: ticket.sku,
			startDate,
			startDateInput,
			startDateMoment: startMoment,
			endDate,
			endDateInput,
			endDateMoment: endMoment,
			startTime,
			endTime,
			capacityType: ticket.capacity_type,
			capacity: ticket.capacity,
		};

		yield all( [
			put( actions.setTicketDetails( blockId, details ) ),
			put( actions.setTicketTempDetails( blockId, details ) ),
			put( actions.setTicketSold( blockId, totals.sold ) ),
			put( actions.setTicketAvailable( blockId, totals.stock ) ),
			put( actions.setTicketCurrencySymbol( blockId, cost_details.currency_symbol ) ),
			put( actions.setTicketProvider( blockId, provider ) ),
			put( actions.setTicketHasBeenCreated( clientId, values.hasBeenCreated ) ),
		] );
	} catch ( e ) {
		/**
		 * @todo handle error scenario
		 */
	} finally {
		yield put( actions.setTicketIsLoading( blockId, false ) );
	}
}

/**
 * @todo missing tests.
 */
export function* createNewTicket( action ) {
	const { blockId } = action.payload;
	const props = { blockId }

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

		const tempSharedCapacity = yield select( selectors.getTicketsTempSharedCapacity );
		if ( ! isNaN( tempSharedCapacity ) && tempSharedCapacity > 0 ) {
			yield put( actions.setTicketsSharedCapacity( tempSharedCapacity ) );
		}

		yield all( [
			put( actions.setTicketDetails( blockId, {
				title: yield select( actions.getTicketTempTitle, props ),
				description: yield select( actions.getTicketTempDescription, props ),
				price: yield select( actions.getTicketTempPrice, props ),
				sku: yield select( actions.getTicketTempSku, props ),
				startDate: yield select( actions.getTicketTempStartDate, props ),
				startDateInput: yield select( actions.getTicketTempStartDateInput, props ),
				startDateMoment: yield select( actions.getTicketTempStartDateMoment, props ),
				endDate: yield select( actions.getTicketTempEndDate, props ),
				endDateInput: yield select( actions.getTicketTempEndDateInput, props ),
				endDateMoment: yield select( actions.getTicketTempEndDateMoment, props ),
				startTime: yield select( actions.getTicketTempStartTime, props ),
				endTime: yield select( actions.getTicketTempEndTime, props ),
				capacityType: yield select( actions.getTicketTempCapacityType, props ),
				capacity: yield select( actions.getTicketTempCapacity, props ),
			} ) ),
			put( actions.setTicketId( blockId, ticket.ID ) ),
			put( actions.setTicketHasBeenCreated( blockId, true ) ),
			put( actions.setTicketAvailable( blockId, ticket.capacity ) ),
			put( actions.setTicketProvider( blockId, PROVIDER_CLASS_TO_PROVIDER_MAPPING[ ticket.provider_class ] ) ),
			put( actions.setTicketHasChanges( blockId, false ) ),
		] );
	} catch ( e ) {
		/**
		 * @todo: handle error scenario
		 */
	} finally {
		yield put( actions.setTicketIsLoading( blockId, false ) ),
	}
}

export function* updateTicket( action ) {
	const { blockId } = action.payload;
	const props = { blockId };

	const { edit_ticket_nonce = '' } = restNonce();
	const body = yield call( setBodyDetails, blockId );
	body.append( 'edit_ticket_nonce', edit_ticket_nonce );

	const ticketId = yield select( selectors.getTicketId, props );

	try {
		const data = [];
		for ( const pair of body.entries() ) {
			data.push( `${ encodeURIComponent( pair[ 0 ] ) }=${ encodeURIComponent( pair[ 1 ] ) }` );
		}

		yield put( actions.setTicketIsLoading( blockId, true ) );
		yield call( wpREST, {
			path: `tickets/${ ticketId }`,
			namespace: 'tribe/tickets/v1',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			initParams: {
				method: 'PUT',
				body: data.join( '&' ),
			},
		} );

		yield all( [
			put( actions.setTicketDetails( blockId, {
				title: yield select( actions.getTicketTempTitle, props ),
				description: yield select( actions.getTicketTempDescription, props ),
				price: yield select( actions.getTicketTempPrice, props ),
				sku: yield select( actions.getTicketTempSku, props ),
				startDate: yield select( actions.getTicketTempStartDate, props ),
				startDateInput: yield select( actions.getTicketTempStartDateInput, props ),
				startDateMoment: yield select( actions.getTicketTempStartDateMoment, props ),
				endDate: yield select( actions.getTicketTempEndDate, props ),
				endDateInput: yield select( actions.getTicketTempEndDateInput, props ),
				endDateMoment: yield select( actions.getTicketTempEndDateMoment, props ),
				startTime: yield select( actions.getTicketTempStartTime, props ),
				endTime: yield select( actions.getTicketTempEndTime, props ),
				capacityType: yield select( actions.getTicketTempCapacityType, props ),
				capacity: yield select( actions.getTicketTempCapacity, props ),
			} ) ),
			put( actions.setTicketHasChanges( blockId, false ) ),
		] );
	} catch ( e ) {
		/**
		 * @todo: handle error scenario
		 */
	} finally {
		put( actions.setTicketIsLoading( blockId, false ) );
	}
}

/**
 * @todo missing tests.
 */
export function* deleteTicket( action ) {
	const { blockId } = action.payload;
	const props = { blockId };

	const hasBeenCreated = yield select( selectors.getTicketHasBeenCreated, props );

	if ( hasBeenCreated ) {
		const ticketId = yield select( selectors.getTicketId, props );
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
			yield put( actions.setTicketIsLoading( blockId, true ) ),
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
		} catch ( e ) {
			/**
			 * @todo handle error on removal
			 */
		}
	}
}

export function* setTicketDetails( action ) {
	const { blockId, details } = action.payload;
	const {
		title,
		description,
		price,
		sku,
		startDate,
		startDateMoment,
		endDate,
		endDateMoment,
		startTime,
		endTime,
		capacityType,
		capacity,
	} = details;

	yield all( [
		put( actions.setTicketTitle( blockId, title ) ),
		put( actions.setTicketDescription( blockId, description ) ),
		put( actions.setTicketPrice( blockId, price ) ),
		put( actions.setTicketSku( blockId, sku ) ),
		put( actions.setTicketStartDate( blockId, startDate ) ),
		put( actions.setTicketStartDateMoment( blockId, startDateMoment ) ),
		put( actions.setTicketEndDate( blockId, endDate ) ),
		put( actions.setTicketEndDateMoment( blockId, endDateMoment ) ),
		put( actions.setTicketStartTime( blockId, startTime ) ),
		put( actions.setTicketEndTime( blockId, endTime ) ),
		put( actions.setTicketCapacityType( blockId, capacityType ) ),
		put( actions.setTicketCapacity( blockId, capacity ) ),
	] );
}

export function* setTempTicketDetails( action ) {
	const { blockId, tempDetails } = action.payload;
	const {
		title,
		description,
		price,
		sku,
		startDate,
		startDateMoment,
		endDate,
		endDateMoment,
		startTime,
		endTime,
		capacityType,
		capacity,
	} = tempDetails;

	yield all( [
		put( actions.setTicketTempTitle( blockId, title ) ),
		put( actions.setTicketTempDescription( blockId, description ) ),
		put( actions.setTicketTempPrice( blockId, price ) ),
		put( actions.setTicketTempSku( blockId, sku ) ),
		put( actions.setTicketTempStartDate( blockId, startDate ) ),
		put( actions.setTicketTempStartDateMoment( blockId, startDateMoment ) ),
		put( actions.setTicketTempEndDate( blockId, endDate ) ),
		put( actions.setTicketTempEndDateMoment( blockId, endDateMoment ) ),
		put( actions.setTicketTempStartTime( blockId, startTime ) ),
		put( actions.setTicketTempEndTime( blockId, endTime ) ),
		put( actions.setTicketTempCapacityType( blockId, capacityType ) ),
		put( actions.setTicketTempCapacity( blockId, capacity ) ),
	] );
}

export default function* watchers() {
	// yield takeEvery( types.SET_TICKET_BLOCK_ID, setEditInTicketBlock );
	// yield takeEvery( types.SET_TICKET_IS_EDITING, updateActiveEditBlock );
	yield takeEvery( types.SET_TICKETS_INITIAL_STATE, setInitialState );
	yield takeEvery( types.SET_TICKET_INITIAL_STATE, setTicketInitialState );
	yield takeEvery( types.FETCH_TICKET, fetchTicket );
	yield takeEvery( types.CREATE_NEW_TICKET, createNewTicket );
	yield takeEvery( types.UPDATE_TICKET, updateTicket );
	yield takeEvery( types.DELETE_TICKET, deleteTicket );
	yield takeEvery( types.SET_TICKET_DETAILS, setTicketDetails );
	yield takeEvery( types.SET_TICKET_TEMP_DETAILS, setTicketTempDetails );
}
