/**
 * External dependencies
 */
import { takeEvery } from 'redux-saga/effects';

/**
 * Internal Dependencies
 */
import { types } from '@moderntribe/events-pro/data/blocks/additional-fields';
import watchers, * as sagas from '../sagas';

/**
 * @todo Add tests for the rest of the sagas
 */
describe( 'Event Date time Block sagas', () => {
	describe( 'watchers', () => {
		test( 'watcher actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_ADDITIONAL_FIELD_INITIAL_STATE, sagas.setInitialState ),
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_ADDITIONAL_FIELD_CHANGE, sagas.setPristineState ),
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.APPEND_ADDITIONAL_FIELD_VALUE, sagas.appendFieldValue ),
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.REMOVE_ADDITIONAL_FIELD_VALUE, sagas.removeFieldValue ),
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
} );
