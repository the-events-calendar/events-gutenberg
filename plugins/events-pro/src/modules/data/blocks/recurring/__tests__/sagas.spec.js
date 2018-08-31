/**
 * External dependencies
 */
import { takeEvery, put, select } from 'redux-saga/effects';

/**
 * Internal Dependencies
 */
import { actions } from '@moderntribe/events-pro/data/ui';
import { selectors, types } from '@moderntribe/events-pro/data/blocks/recurring';
import watchers, * as sagas from '../sagas';

describe( 'recurring sagas', () => {
	describe( 'watchers', () => {
		it( 'should watch actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( [ types.REMOVE_RECURRING_FIELD ], sagas.handleRuleRemoval )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
	describe( 'handleRuleRemove', () => {
		it( 'should not hide rule panel', () => {
			const gen = sagas.handleRuleRemoval();
			expect( gen.next().value ).toEqual(
				select( selectors.getRules )
			);
			expect( gen.next( [{ id: 1 }] ).done ).toEqual( true );
		} );
		it( 'should hide rule panel', () => {
			const gen = sagas.handleRuleRemoval();
			expect( gen.next().value ).toEqual(
				select( selectors.getRules )
			);
			expect( gen.next( [] ).value ).toEqual(
				put( actions.hideRulePanel() )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
} );
