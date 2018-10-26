/**
 * External dependencies
 */
import { takeEvery } from 'redux-saga/effects';

/**
 * Internal Dependencies
 */
import { types } from '@moderntribe/events-pro/data/blocks/additional-fields';
import watchers, * as sagas from '../sagas';
import { FIELD_TYPES } from '@moderntribe/events-pro/blocks/additional-fields/utils';

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
			expect( gen.  next().value ).toEqual(
				takeEvery( types.SET_ADDITIONAL_FIELD_BLUR, sagas.onFieldBlur )
			);
			expect( gen.next().value ).toEqual(
				takeEvery(
					[
						`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.text }`,
						`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.radio }`,
						`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.url }`,
						`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.textarea }`,
					],
					sagas.setTextFieldOutput
				),
			);
			expect( gen.next().value ).toEqual(
				takeEvery(
					`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.dropdown }`,
					sagas.setDropdownOutput,
				),
			);
			expect( gen.next().value ).toEqual(
				takeEvery(
					`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.checkbox }`,
					sagas.setCheckboxOutput,
				),
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
} );
