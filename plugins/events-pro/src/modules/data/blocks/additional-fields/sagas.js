/**
 * External dependencies
 */
import { takeEvery, put, select, all } from 'redux-saga/effects';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';

/**
 * Internal dependencies
 */
import { actions, types, selectors } from '@moderntribe/events-pro/data/blocks/additional-fields';
import { FIELD_TYPES } from '@moderntribe/events-pro/blocks/additional-fields/utils';

export function* setInitialState( props ) {
	const { payload = {} } = props;
	const { name = '', get = noop } = payload;
	const type = get( 'type' );
	const value = get( 'value' );
	const fallbackValue = type === FIELD_TYPES.checkbox ? [] : null;

	yield all( [
		put( actions.addField( name ) ),
		put( actions.setFieldIsPristine( name, get( 'isPristine' ) ) ),
		put( actions.setFieldType( name, type ) ),
		put( actions.setFieldLabel( name, get( 'label' ) ) ),
		put( actions.setFieldOptions( name, get( 'options' ) ) ),
		put( actions.setFieldValue( name, value || fallbackValue ) ),
	] );
}

export function* setPristineState( props ) {
	const { payload = {} } = props;
	const { name = '' } = payload;
	const { value } = yield all( {
		type: select( selectors.getFieldType, payload ),
		value: select( selectors.getFieldValue, payload ),
	} );
	const isPristine = value === null || '' === value || isEmpty( value );
	yield put( actions.setFieldIsPristine( name, isPristine ) );
}

export default function* watchers() {
	yield takeEvery( types.SET_ADDITIONAL_FIELD_INITIAL_STATE, setInitialState );
	yield takeEvery( types.SET_ADDITIONAL_FIELD_CHANGE, setPristineState );
}
