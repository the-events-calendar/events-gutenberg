/**
 * External dependencies
 */
import { takeEvery, put, all, select, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

/**
 * Internal Dependencies
 */
import * as types from '../types';
import * as actions from '../actions';
import watchers, * as sagas from '../sagas';
import * as selectors from '../selectors';
import {
	DEFAULT_STATE as HEADER_IMAGE_DEFAULT_STATE
} from '../reducers/header-image';
import { getStart } from '@moderntribe/events/data/blocks/datetime/selectors';
import * as utils from '@moderntribe/tickets/data/utils';
import { wpREST } from '@moderntribe/common/utils/api';
import { moment as momentUtil } from '@moderntribe/common/utils';

jest.mock( '@wordpress/data', () => ( {
	select: ( key ) => {
		if ( key === 'core/editor' ) {
			return {
				getCurrentPostId: () => 10,
				getEditedPostAttribute: ( attr ) => {
					if ( attr === 'date' ) {
						return '2018-11-09T19:48:42';
					}
				},
			};
		}
	},
} ) );

describe( 'Ticket Block sagas', () => {
	describe( 'watchers', () => {
		it( 'should watch actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKETS_INITIAL_STATE, sagas.setTicketsInitialState )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_INITIAL_STATE, sagas.setTicketInitialState )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.FETCH_TICKET, sagas.fetchTicket )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.CREATE_NEW_TICKET, sagas.createNewTicket )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.UPDATE_TICKET, sagas.updateTicket )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.DELETE_TICKET, sagas.deleteTicket )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.FETCH_TICKETS_HEADER_IMAGE, sagas.fetchTicketsHeaderImage )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.UPDATE_TICKETS_HEADER_IMAGE, sagas.updateTicketsHeaderImage )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.DELETE_TICKETS_HEADER_IMAGE, sagas.deleteTicketsHeaderImage )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_DETAILS, sagas.setTicketDetails )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_TEMP_DETAILS, sagas.setTicketTempDetails )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );

	describe( 'setTicketsInitialState', () => {
		it( 'should set tickets initial state', () => {
			const HEADER = 13;
			const SHARED_CAPACITY = '100';
			const PROVIDER = 'woo';
			const action = {
				payload: {
					get: ( key ) => {
						switch ( key ) {
							case 'header':
								return HEADER;
							case 'sharedCapacity':
								return SHARED_CAPACITY;
							case 'provider':
								return PROVIDER;
							default:
								return;
						}
					},
				},
			};

			const gen = sagas.setTicketsInitialState( action );
			expect( gen.next().value ).toEqual(
				all( [
					put( actions.setTicketsSharedCapacity( SHARED_CAPACITY ) ),
					put( actions.setTicketsTempSharedCapacity( SHARED_CAPACITY ) ),
				] )
			);
			expect( gen.next().value ).toEqual(
				put( actions.fetchTicketsHeaderImage( HEADER ) )
			);
			expect( gen.next().value ).toEqual(
				put( actions.setTicketsProvider( PROVIDER ) )
			);
			expect( gen.next().done ).toEqual( true );
		} );

		it( 'should set tickets initial state for new event and no provider', () => {
			const HEADER = 0;
			const SHARED_CAPACITY = '0';
			const PROVIDER = '';
			const action = {
				payload: {
					get: ( key ) => {
						switch ( key ) {
							case 'header':
								return HEADER;
							case 'sharedCapacity':
								return SHARED_CAPACITY;
							case 'provider':
								return PROVIDER;
							default:
								return;
						}
					},
				},
			};
			const gen = sagas.setTicketsInitialState( action );
			expect( gen.next().value ).toEqual(
				put( actions.setTicketsProvider( PROVIDER ) )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );

	describe( 'setTicketInitialState', () => {
		let publishDate,
			startMoment,
			startDate,
			startDateInput,
			startTime,
			eventStart,
			endMoment,
			endDate,
			endDateInput,
			endTime;

		beforeEach( () => {
			publishDate = '2018-11-09T19:48:42';
			startMoment = momentUtil.toMoment( publishDate );
			startDate = momentUtil.toDatabaseDate( startMoment );
			startDateInput = momentUtil.toDate( startMoment );
			startTime = momentUtil.toDatabaseTime( startMoment );
			eventStart = 'November 30, 2018 12:30:00';
			endMoment = momentUtil.toMoment( eventStart );
			endDate = momentUtil.toDatabaseDate( endMoment );
			endDateInput = momentUtil.toDate( endMoment );
			endTime = momentUtil.toDatabaseTime( endMoment );
		} );

		it( 'should set tickets initial state', () => {
			const TICKET_ID = 99;
			const CLIENT_ID = 'modern-tribe';
			const action = {
				payload: {
					get: ( key ) => {
						if ( key === 'ticketId' ) {
							return TICKET_ID;
						}
					},
					clientId: CLIENT_ID,
				},
			};

			const gen = cloneableGenerator( sagas.setTicketInitialState )( action );
			expect( gen.next().value ).toEqual(
				call( momentUtil.toMoment, publishDate )
			);
			expect( gen.next( startMoment ).value ).toEqual(
				call( momentUtil.toDatabaseDate, startMoment )
			);
			expect( gen.next( startDate ).value ).toEqual(
				call( momentUtil.toDate, startMoment )
			);
			expect( gen.next( startDateInput ).value ).toEqual(
				call( momentUtil.toDatabaseTime, startMoment )
			);
			expect( gen.next( startTime ).value ).toEqual(
				all( [
					put( actions.setTicketStartDate( action.payload.clientId, startDate ) ),
					put( actions.setTicketStartDateInput( action.payload.clientId, startDateInput ) ),
					put( actions.setTicketStartDateMoment( action.payload.clientId, startMoment ) ),
					put( actions.setTicketStartTime( action.payload.clientId, startTime ) ),
					put( actions.setTicketTempStartDate( action.payload.clientId, startDate ) ),
					put( actions.setTicketTempStartDateInput( action.payload.clientId, startDateInput ) ),
					put( actions.setTicketTempStartDateMoment( action.payload.clientId, startMoment ) ),
					put( actions.setTicketTempStartTime( action.payload.clientId, startTime ) ),
				] )
			);
			expect( gen.next().value ).toEqual(
				select( getStart )
			)
			expect( gen.next( eventStart ).value ).toEqual(
				call( momentUtil.toMoment, eventStart )
			);
			expect( gen.next( endMoment ).value ).toEqual(
				call( momentUtil.toDatabaseDate, endMoment )
			);
			expect( gen.next( endDate ).value ).toEqual(
				call( momentUtil.toDate, endMoment )
			);
			expect( gen.next( endDateInput ).value ).toEqual(
				call( momentUtil.toDatabaseTime, endMoment )
			);
			expect( gen.next( endTime ).value ).toEqual(
				all( [
					put( actions.setTicketEndDate( action.payload.clientId, endDate ) ),
					put( actions.setTicketEndDateInput( action.payload.clientId, endDateInput ) ),
					put( actions.setTicketEndDateMoment( action.payload.clientId, endMoment ) ),
					put( actions.setTicketEndTime( action.payload.clientId, endTime ) ),
					put( actions.setTicketTempEndDate( action.payload.clientId, endDate ) ),
					put( actions.setTicketTempEndDateInput( action.payload.clientId, endDateInput ) ),
					put( actions.setTicketTempEndDateMoment( action.payload.clientId, endMoment ) ),
					put( actions.setTicketTempEndTime( action.payload.clientId, endTime ) ),
				] )
			);
			expect( gen.next().value ).toEqual(
				select( selectors.getTicketsSharedCapacity )
			);

			const clone1 = gen.clone();
			const blankSharedCapacity = '';

			expect( clone1.next( blankSharedCapacity ).value ).toEqual(
				all( [
					put( actions.setTicketId( CLIENT_ID, TICKET_ID ) ),
					put( actions.fetchTicket( CLIENT_ID, TICKET_ID ) ),
				] )
			);
			expect( clone1.next().done ).toEqual( true );

			const clone2 = gen.clone();
			const sharedCapacity = '100';

			expect( clone2.next( sharedCapacity ).value ).toEqual(
				all( [
					put( actions.setTicketCapacity( CLIENT_ID, sharedCapacity ) ),
					put( actions.setTicketTempCapacity( CLIENT_ID, sharedCapacity ) ),
				] )
			);
			expect( clone2.next().value ).toEqual(
				all( [
					put( actions.setTicketId( CLIENT_ID, TICKET_ID ) ),
					put( actions.fetchTicket( CLIENT_ID, TICKET_ID ) ),
				] )
			);
			expect( clone2.next().done ).toEqual( true );
		} );

		it( 'should set tickets initial state for new ticket', () => {
			const TICKET_ID = 0;
			const CLIENT_ID = 'modern-tribe';
			const action = {
				payload: {
					get: ( key ) => {
						if ( key === 'ticketId' ) {
							return TICKET_ID;
						}
					},
					clientId: CLIENT_ID,
				},
			};

			const gen = cloneableGenerator( sagas.setTicketInitialState )( action );
			expect( gen.next().value ).toEqual(
				call( momentUtil.toMoment, publishDate )
			);
			expect( gen.next( startMoment ).value ).toEqual(
				call( momentUtil.toDatabaseDate, startMoment )
			);
			expect( gen.next( startDate ).value ).toEqual(
				call( momentUtil.toDate, startMoment )
			);
			expect( gen.next( startDateInput ).value ).toEqual(
				call( momentUtil.toDatabaseTime, startMoment )
			);
			expect( gen.next( startTime ).value ).toEqual(
				all( [
					put( actions.setTicketStartDate( action.payload.clientId, startDate ) ),
					put( actions.setTicketStartDateInput( action.payload.clientId, startDateInput ) ),
					put( actions.setTicketStartDateMoment( action.payload.clientId, startMoment ) ),
					put( actions.setTicketStartTime( action.payload.clientId, startTime ) ),
					put( actions.setTicketTempStartDate( action.payload.clientId, startDate ) ),
					put( actions.setTicketTempStartDateInput( action.payload.clientId, startDateInput ) ),
					put( actions.setTicketTempStartDateMoment( action.payload.clientId, startMoment ) ),
					put( actions.setTicketTempStartTime( action.payload.clientId, startTime ) ),
				] )
			);
			expect( gen.next().value ).toEqual(
				select( getStart )
			)
			expect( gen.next( eventStart ).value ).toEqual(
				call( momentUtil.toMoment, eventStart )
			);
			expect( gen.next( endMoment ).value ).toEqual(
				call( momentUtil.toDatabaseDate, endMoment )
			);
			expect( gen.next( endDate ).value ).toEqual(
				call( momentUtil.toDate, endMoment )
			);
			expect( gen.next( endDateInput ).value ).toEqual(
				call( momentUtil.toDatabaseTime, endMoment )
			);
			expect( gen.next( endTime ).value ).toEqual(
				all( [
					put( actions.setTicketEndDate( action.payload.clientId, endDate ) ),
					put( actions.setTicketEndDateInput( action.payload.clientId, endDateInput ) ),
					put( actions.setTicketEndDateMoment( action.payload.clientId, endMoment ) ),
					put( actions.setTicketEndTime( action.payload.clientId, endTime ) ),
					put( actions.setTicketTempEndDate( action.payload.clientId, endDate ) ),
					put( actions.setTicketTempEndDateInput( action.payload.clientId, endDateInput ) ),
					put( actions.setTicketTempEndDateMoment( action.payload.clientId, endMoment ) ),
					put( actions.setTicketTempEndTime( action.payload.clientId, endTime ) ),
				] )
			);
			expect( gen.next().value ).toEqual(
				select( selectors.getTicketsSharedCapacity )
			);

			const clone1 = gen.clone();
			const blankSharedCapacity = '';

			expect( clone1.next( blankSharedCapacity ).done ).toEqual( true );

			const clone2 = gen.clone();
			const sharedCapacity = '100';

			expect( clone2.next( sharedCapacity ).value ).toEqual(
				all( [
					put( actions.setTicketCapacity( CLIENT_ID, sharedCapacity ) ),
					put( actions.setTicketTempCapacity( CLIENT_ID, sharedCapacity ) ),
				] )
			);
			expect( clone2.next().done ).toEqual( true );
		} );
	} );

	describe( 'fetchTicketsHeaderImage', () => {
		it( 'should fetch tickets header image', () => {
			const action = {
				payload: {
					id: 99,
				},
			};
			const gen = cloneableGenerator( sagas.fetchTicketsHeaderImage )( action );

			expect( gen.next().value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( true ) )
			);
			expect( gen.next().value ).toEqual(
				call( wpREST, { path: `media/${ action.payload.id }` } )
			);

			const clone1 = gen.clone();
			const apiResponseBad = {
				response: {
					ok: false,
				},
				data: {},
			};

			expect( clone1.next( apiResponseBad ).value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( false ) )
			);
			expect( clone1.next().done ).toEqual( true );

			const clone2 = gen.clone();
			const apiResponseGood = {
				response: {
					ok: true,
				},
				data: {
					id: 99,
					alt_text: 'tribe',
					media_details: {
						sizes: {
							medium: {
								source_url: '#',
							},
						},
					},
				},
			};

			expect( clone2.next( apiResponseGood ).value ).toEqual(
				put( actions.setTicketsHeaderImage( {
					id: apiResponseGood.data.id,
					alt: apiResponseGood.data.alt_text,
					src: apiResponseGood.data.media_details.sizes.medium.source_url,
				} ) )
			);
			expect( clone2.next().value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( false ) )
			);
			expect( clone2.next().done ).toEqual( true );
		} );
	} );

	describe( 'updateTicketsHeaderImage', () => {
		it( 'should update tickets header image', () => {
			const action = {
				payload: {
					image: {
						id: 99,
						alt: 'tribe',
						sizes: {
							medium: {
								url: '#',
							},
						},
					},
				},
			};
			const gen = cloneableGenerator( sagas.updateTicketsHeaderImage )( action );

			expect( gen.next().value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( true ) )
			);
			expect( gen.next().value ).toEqual(
				call( wpREST, {
					path: `tribe_events/${ 10 }`,
					headers: {
						'Content-Type': 'application/json',
					},
					initParams: {
						method: 'PUT',
						body: JSON.stringify( {
							meta: {
								[ utils.KEY_TICKET_HEADER ]: `${ action.payload.image.id }`,
							},
						} ),
					},
				} )
			);

			const clone1 = gen.clone();
			const apiResponseBad = {
				response: {
					ok: false,
				},
			};

			expect( clone1.next( apiResponseBad ).value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( false ) )
			);
			expect( clone1.next().done ).toEqual( true );

			const clone2 = gen.clone();
			const apiResponseGood = {
				response: {
					ok: true,
				},
			};

			expect( clone2.next( apiResponseGood ).value ).toEqual(
				put( actions.setTicketsHeaderImage( {
					id: action.payload.image.id,
					alt: action.payload.image.alt,
					src: action.payload.image.sizes.medium.url,
				} ) )
			);
			expect( clone2.next().value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( false ) )
			);
			expect( clone2.next().done ).toEqual( true );
		} );
	} );

	describe( 'deleteTicketsHeaderImage', () => {
		it( 'should delete tickets header image', () => {
			const gen = cloneableGenerator( sagas.deleteTicketsHeaderImage )();
			expect( gen.next().value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( true ) )
			);
			expect( gen.next().value ).toEqual(
				call( wpREST, {
					path: `tribe_events/${ 10 }`,
					headers: {
						'Content-Type': 'application/json',
					},
					initParams: {
						method: 'PUT',
						body: JSON.stringify( {
							meta: {
								[ utils.KEY_TICKET_HEADER ]: null,
							},
						} ),
					},
				} )
			);

			const clone1 = gen.clone();
			const apiResponseBad = {
				response: {
					ok: false,
				},
			};

			expect( clone1.next( apiResponseBad ).value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( false ) )
			);
			expect( clone1.next().done ).toEqual( true );

			const clone2 = gen.clone();
			const apiResponseGood = {
				response: {
					ok: true,
				},
			};

			expect( clone2.next( apiResponseGood ).value ).toEqual(
				put( actions.setTicketsHeaderImage( HEADER_IMAGE_DEFAULT_STATE ) )
			);
			expect( clone2.next().value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( false ) )
			);
			expect( clone2.next().done ).toEqual( true );
		} );
	} );
} );
