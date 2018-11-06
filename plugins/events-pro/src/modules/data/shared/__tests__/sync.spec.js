/**
 * External dependencies
 */
import { takeLatest, takeEvery, take, select, call, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { PREFIX_EVENTS_PRO_STORE } from '@moderntribe/events-pro/data/prefix';

import watchers, * as sagas from '../sync';

describe( 'Sync Sagas', () => {
	describe( 'watchers', () => {
		it( 'should be watching', () => {
			const gen = watchers();

			expect( gen.next().value ).toEqual(
				takeEvery( sagas.INITIALIZE_SYNC, sagas.initialize )
			);
		} );
	} );

	describe( 'serialize', () => {
		it( 'should convert to JSON', () => {
			const gen = sagas.serialize( [] );
			expect( gen.next().value ).toEqual(
				call( [ JSON, 'stringify' ], [] )
			);
			expect( gen.next().done ).toBeTruthy();
		} );
	} );

	describe( 'initialize', () => {
		let args, clientId, metaField, setAttributes;

		beforeEach( () => {
			clientId = 'clientId';
			metaField = 'meta';
			setAttributes = jest.fn();

			args = {
				listeners: [ 'action_to_listen_for' ],
				selector: jest.fn(),
				clientId,
				metaField,
				setAttributes,
			};
		} );

		it( 'should start sync', () => {
			const gen = sagas.initialize( args );
			const task = createMockTask();

			expect( gen.next().value ).toEqual(
				takeLatest( args.listeners, sagas.sync, {
					selector: args.selector,
					metaField,
					setAttributes,
				} )
			);

			expect( gen.next( task ).value ).toEqual(
				take( sagas.CANCEL_SYNC )
			);

			expect( gen.next( { type: sagas.CANCEL_SYNC, clientId } ).value ).toEqual(
				cancel( task )
			);

			expect( gen.next().done ).toBeTruthy();
		} );
	} );

	describe( 'sync', () => {
		let args, metaField, setAttributes;

		beforeEach( () => {
			metaField = 'meta';
			setAttributes = jest.fn();

			args = {
				selector: jest.fn(),
				metaField,
				setAttributes,
			};
		} );

		it( 'should sync', () => {
			const gen = sagas.sync( args );

			expect( gen.next().value ).toEqual(
				select( args.selector )
			);

			expect( gen.next( 1 ).value ).toEqual(
				call( sagas.serialize, 1 )
			);

			expect( gen.next( '1' ).value ).toEqual(
				call( setAttributes, {
					[ metaField ]: '1',
				} )
			);

			expect( gen.next().done ).toBeTruthy();
		} );
	} );
} );
