/**
 * External dependencies
 */
import { takeEvery, put, select, call } from 'redux-saga/effects';
import { keys } from 'lodash';

/**
 * Internal Dependencies
 */
import { constants } from '@moderntribe/events-pro/data/blocks';
import * as exception from '@moderntribe/events-pro/data/blocks/exception';
import * as selectors from '@moderntribe/events-pro/data/blocks/exception/selectors';
import * as ui from '@moderntribe/events-pro/data/ui';
import watchers, * as sagas from '../sagas';
import * as shared from '@moderntribe/events-pro/data/shared/sagas';
import { SET_TIME_ZONE } from '@moderntribe/events/data/blocks/datetime/types';

describe( 'exception sagas', () => {
	describe( 'watchers', () => {
		it( 'should watch actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( [ exception.types.REMOVE_EXCEPTION ], sagas.handleExceptionRemoval )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( [ exception.types.ADD_EXCEPTION_FIELD ], shared.handleAddition, sagas.sagaArgs )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( [ exception.types.EDIT_EXCEPTION ], sagas.handleExceptionEdit )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( [ SET_TIME_ZONE ], sagas.syncExceptions )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
	describe( 'handleExceptionRemoval', () => {
		it( 'should not hide exception panel', () => {
			const gen = sagas.handleExceptionRemoval();
			expect( gen.next().value ).toEqual(
				select( exception.selectors.getExceptions )
			);
			expect( gen.next( [{ id: 'uniqid' }] ).done ).toEqual( true );
		} );
		it( 'should hide exception panel', () => {
			const gen = sagas.handleExceptionRemoval();
			expect( gen.next().value ).toEqual(
				select( exception.selectors.getExceptions )
			);
			expect( gen.next( [] ).value ).toEqual(
				put( ui.actions.hideExceptionPanel() )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
	describe( 'handleExceptionEdit', () => {
		it( 'should not sync', () => {
			const gen = sagas.handleExceptionEdit( { sync: true } );
			gen.next().value;
			expect( gen.next().done ).toBeTruthy();
		} );

		describe( 'edit flows', () => {
			let action, payload;

			beforeEach( () => {
				payload = {};
				action = { payload, index: 0 };
			} );

			it( 'should handle start time', () => {
				payload[ constants.KEY_START_TIME ] = '12:00:00';
				const gen = sagas.handleExceptionEdit( action );

				expect( gen.next().value ).toEqual(
					call( keys, action.payload )
				);

				expect( gen.next( [ constants.KEY_START_TIME ] ).value ).toEqual(
					call( shared.handleTimeChange, sagas.sagaArgs, action, constants.KEY_START_TIME )
				);

				expect( gen.next().done ).toBeTruthy();
			} );
			it( 'should handle end time', () => {
				payload[ constants.KEY_END_TIME ] = '12:00:00';
				const gen = sagas.handleExceptionEdit( action );

				expect( gen.next().value ).toEqual(
					call( keys, action.payload )
				);

				expect( gen.next( [ constants.KEY_END_TIME ] ).value ).toEqual(
					call( shared.handleTimeChange, sagas.sagaArgs, action, constants.KEY_END_TIME )
				);

				expect( gen.next().done ).toBeTruthy();
			} );
			it( 'should handle multi day', () => {
				payload[ constants.KEY_MULTI_DAY ] = false;
				const gen = sagas.handleExceptionEdit( action );

				expect( gen.next().value ).toEqual(
					call( keys, action.payload )
				);

				expect( gen.next( [ constants.KEY_MULTI_DAY ] ).value ).toEqual(
					call( shared.handleMultiDayChange, sagas.sagaArgs, action, constants.KEY_MULTI_DAY )
				);

				expect( gen.next().done ).toBeTruthy();
			} );
			it( 'should handle week', () => {
				payload[ constants.KEY_WEEK ] = [ 1, 2, 3 ];
				const gen = sagas.handleExceptionEdit( action );

				expect( gen.next().value ).toEqual(
					call( keys, action.payload )
				);

				expect( gen.next( [ constants.KEY_WEEK ] ).value ).toEqual(
					call( shared.handleWeekChange, sagas.sagaArgs, action, constants.KEY_WEEK )
				);

				expect( gen.next().done ).toBeTruthy();
			} );
			it( 'should handle limit type', () => {
				payload[ constants.KEY_LIMIT_TYPE ] = 'count';
				const gen = sagas.handleExceptionEdit( action );

				expect( gen.next().value ).toEqual(
					call( keys, action.payload )
				);

				expect( gen.next( [ constants.KEY_LIMIT_TYPE ] ).value ).toEqual(
					call( shared.handleLimitTypeChange, sagas.sagaArgs, action, constants.KEY_LIMIT_TYPE )
				);

				expect( gen.next().done ).toBeTruthy();
			} );
		} );
	} );

	describe( 'syncExceptions', () => {
		let action, exceptions;
		beforeEach( () => {
			action = {
				payload: {
					timeZone: 'UTC+1',
				},
				type: SET_TIME_ZONE,
			};
			exceptions = [
				{},
				{},
				{},
			];
		} );
		it( 'should sync all exceptions', () => {
			const gen = sagas.syncExceptions( action );

			expect( gen.next().value ).toEqual(
				select( selectors.getExceptions )
			);

			expect( gen.next( exceptions ).value ).toEqual(
				call( shared.handleTimezoneChange, sagas.sagaArgs, { index: 0, ...action }, 'timeZone' )
			);
			expect( gen.next().value ).toEqual(
				call( shared.handleTimezoneChange, sagas.sagaArgs, { index: 1, ...action }, 'timeZone' )
			);
			expect( gen.next().value ).toEqual(
				call( shared.handleTimezoneChange, sagas.sagaArgs, { index: 2, ...action }, 'timeZone' )
			);

			expect( gen.next().done ).toBeTruthy();
		} );
	} );
} );
