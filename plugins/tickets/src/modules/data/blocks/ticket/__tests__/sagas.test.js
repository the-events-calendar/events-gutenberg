/**
 * External dependencies
 */
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

/**
 * Internal Dependencies
 */
import * as types from '../types';
import * as actions from '../actions';
import watchers, * as sagas from '../sagas';
import * as selectors from '../selectors';

describe( 'Sharing Block sagas', () => {
	describe( 'watchers', () => {
		test( 'actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_BLOCK_ID, sagas.setEditInTicketBlock ),
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.REMOVE_TICKET_BLOCK, sagas.removeActiveTicketBlock ),
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_CREATE_NEW_TICKET, sagas.createNewTicket ),
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_IS_EDITING, sagas.updateActiveEditBlock ),
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_START_DATE, sagas.setDatePristine ),
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_END_DATE, sagas.setDatePristine ),
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_START_TIME, sagas.setDatePristine ),
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_END_TIME, sagas.setDatePristine ),
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );

	describe( 'sagas', () => {
		test( 'setDatePristine', () => {
			const gen = cloneableGenerator( sagas.setDatePristine )( {
				payload: {
					blockId: 'modern-tribe',
				},
			} );
			expect( gen.next().value ).toEqual(
				put( actions.setTicketDateIsPristine( 'modern-tribe', false ) ),
			);
			expect( gen.next().done ).toEqual( true );
		} );

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

			test( 'when editing and active block is different than new block', () => {
			} );
		} );
	} );
} );
