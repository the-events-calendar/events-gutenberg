/**
 * External dependencies
 */
import { takeEvery, put, select } from 'redux-saga/effects';

/**
 * Internal Dependencies
 */
import * as exception from '@moderntribe/events-pro/data/blocks/exception';
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';
import * as ui from '@moderntribe/events-pro/data/ui';
import { selectors as datetime } from '@moderntribe/events/data/blocks/datetime';
import watchers, * as sagas from '../sagas';

describe( 'exception sagas', () => {
	describe( 'watchers', () => {
		it( 'should watch actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( [ exception.types.REMOVE_EXCEPTION ], sagas.handleExceptionRemoval )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( [ exception.types.ADD_EXCEPTION_FIELD ], sagas.handleExceptionAddition )
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
	describe( 'handleExceptionAddition', () => {
		it( 'should add exception to store', () => {
			const gen = sagas.handleExceptionAddition();
			expect( gen.next().value ).toEqual(
				select( datetime.datetimeSelector )
			);
			const payload = { start: 'start' };
			expect( gen.next( payload ).value ).toEqual(
				put( exception.actions.addException( {
					type: recurring.constants.SINGLE,
					...payload,
				} ) )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
} );
