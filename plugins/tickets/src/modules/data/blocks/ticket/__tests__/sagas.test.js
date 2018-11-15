/**
 * External dependencies
 */
import { takeEvery, put, select, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

/**
 * Internal Dependencies
 */
import * as types from '../types';
import * as actions from '../actions';
import watchers, * as sagas from '../sagas';
import * as selectors from '../selectors';

describe( 'Ticket Block sagas', () => {
	describe( 'watchers', () => {
		test( 'actions', () => {
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

	describe( 'sagas', () => {
		describe( 'updateActiveEditBlock', () => {
			test( 'when is not editing', () => {
				const gen = cloneableGenerator( sagas.updateActiveEditBlock )( {
					payload: {
						blockId: 'modern-tribe',
						isEditing: false,
					},
				} );
				expect( gen.next().done ).toEqual( true );
			} );

			test( 'when editing an no active block is present', () => {
				const gen = cloneableGenerator( sagas.updateActiveEditBlock )( {
					payload: {
						blockId: 'modern-tribe',
						isEditing: true,
					},
				} );
				expect( gen.next().value )
					.toEqual( select( selectors.getActiveBlockId ) );
				expect( gen.next().value )
					.toEqual( put( actions.setActiveChildBlockId( 'modern-tribe' ) ) );
				expect( gen.next().done ).toEqual( true );
			} );
		} );

		describe( 'setInitialState', () => {
			let props;
			beforeEach( () => {
				props = {
					attributes: {
						header: '0',
						sharedCapacity: '0',
						provider: '',
					},
					get( value, defaultValue ) {
						return props.attributes[ value ] ? props.attributes[ value ] : defaultValue;
					},
				};
			} );

			test( 'default values', () => {
				const gen = sagas.setInitialState( { payload: props } );
				expect( gen.next().value ).toEqual( put( actions.setProvider( '' ) ) );
				expect( gen.next().done ).toBe( true );
			} );

			test( 'Shared capacity is other than the default', () => {
				props.attributes.sharedCapacity = '33';
				const gen = sagas.setInitialState( { payload: props } );
				expect( gen.next().value ).toEqual( put( actions.setTotalSharedCapacity( '33' ) ) );
				expect( gen.next().value ).toEqual( put( actions.setProvider( '' ) ) );
				expect( gen.next().done ).toBe( true );
			} );

			test( 'Shared capacity and header are valid values', () => {
				props.attributes.sharedCapacity = '20';
				props.attributes.header = '509';
				const gen = sagas.setInitialState( { payload: props } );
				expect( gen.next().value ).toEqual( put( actions.setTotalSharedCapacity( '20' ) ) );
				expect( gen.next().value ).toEqual( call( sagas.getMedia, 509 ) );
				expect( gen.next().value ).toEqual( put( actions.setProvider( '' ) ) );
				expect( gen.next().done ).toBe( true );
			} );

			test( 'Custom provider is present', () => {
				props.attributes.provider = 'Tribe__Tickets__Commerce__PayPal__Main';
				const gen = sagas.setInitialState( { payload: props } );
				expect( gen.next().value ).toEqual(
					put( actions.setProvider( 'Tribe__Tickets__Commerce__PayPal__Main' ) )
				);
				expect( gen.next().done ).toBe( true );
			} );
		} );
	} );
} );
