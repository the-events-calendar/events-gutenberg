/**
 * External dependencies
 */
import { takeEvery, put, select } from 'redux-saga/effects';

/**
 * Internal Dependencies
 */
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';
import * as ui from '@moderntribe/events-pro/data/ui';
import { selectors as datetime } from '@moderntribe/events/data/blocks/datetime';
import watchers, * as sagas from '../sagas';

describe( 'recurring sagas', () => {
	describe( 'watchers', () => {
		it( 'should watch actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( [ recurring.types.REMOVE_RULE ], sagas.handleRuleRemoval )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( [ recurring.types.ADD_RULE_FIELD ], sagas.handleRuleAddition )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
	describe( 'handleRuleRemove', () => {
		it( 'should not hide rule panel', () => {
			const gen = sagas.handleRuleRemoval();
			expect( gen.next().value ).toEqual(
				select( recurring.selectors.getRules )
			);
			expect( gen.next( [{ id: 1 }] ).done ).toEqual( true );
		} );
		it( 'should hide rule panel', () => {
			const gen = sagas.handleRuleRemoval();
			expect( gen.next().value ).toEqual(
				select( recurring.selectors.getRules )
			);
			expect( gen.next( [] ).value ).toEqual(
				put( ui.actions.hideRulePanel() )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
	describe( 'handleRuleAddition', () => {
		it( 'should add rule to store', () => {
			const gen = sagas.handleRuleAddition();
			expect( gen.next().value ).toEqual(
				select( datetime.datetimeSelector )
			);
			const payload = { start: 'start' };
			expect( gen.next( payload ).value ).toEqual(
				put( recurring.actions.addRule( {
					id: 'uniqid',
					type: recurring.constants.SINGLE,
					...payload,
				} ) )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
} );
