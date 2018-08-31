/**
 * External dependencies
 */
import { takeEvery, put, select } from 'redux-saga/effects';

/**
 * Internal Dependencies
 */
import { actions } from '@moderntribe/events-pro/data/ui';
import { selectors, types } from '@moderntribe/events-pro/data/blocks/exception';
import watchers, * as sagas from '../sagas';

describe( 'exception sagas', () => {
	describe( 'watchers', () => {
		it( 'should watch actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( [ types.REMOVE_EXCEPTION_FIELD ], sagas.handleExceptionRemoval )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
	describe( 'handleExceptionRemoval', () => {
		it( 'should not hide exception panel', () => {
			const gen = sagas.handleExceptionRemoval();
			expect( gen.next().value ).toEqual(
				select( selectors.getExceptions )
			);
			expect( gen.next( [{ id: 1 }] ).done ).toEqual( true );
		} );
		it( 'should hide exception panel', () => {
			const gen = sagas.handleExceptionRemoval();
			expect( gen.next().value ).toEqual(
				select( selectors.getExceptions )
			);
			expect( gen.next( [] ).value ).toEqual(
				put( actions.hideExceptionPanel() )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
} );
