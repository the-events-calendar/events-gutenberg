/**
 * External dependencies
 */
import { takeEvery, put, select, all } from 'redux-saga/effects';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import identity from 'lodash/identity';

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

	yield all( [
		put( actions.addField( name ) ),
		put( actions.setFieldIsPristine( name, get( 'isPristine' ) ) ),
		put( actions.setFieldType( name, type ) ),
		put( actions.setFieldLabel( name, get( 'label' ) ) ),
		put( actions.setFieldOptions( name, get( 'options' ) ) ),
		put( actions.setFieldValue( name, get( 'value' ) ) ),
	] );
}

export function* setPristineState( props ) {
	const { payload = {} } = props;
	const { name = '' } = payload;
	const value  = yield select( selectors.getFieldValue, payload );
	const isPristine = value === null || '' === value || isEmpty( value );
	yield put( actions.setFieldIsPristine( name, isPristine ) );
}

export function* appendFieldValue( props ) {
	const { payload = {} } = props;
	const { name = '', value } = payload;
	const current = yield select( selectors.getFieldCheckboxValue, payload );
	const newValue = [ ...current, value ]
		.filter( identity )
		.join( '|' );
	yield put( actions.setFieldValue( name, newValue ) );
}

export function* removeFieldValue( props ) {
	const { payload = {} } = props;
	const { name = '', value } = payload;
	const current = yield select( selectors.getFieldCheckboxValue, payload );
	const newValue = current
		.filter( ( text ) => text !== value )
		.join( '|' );
	yield put( actions.setFieldValue( name, newValue ) );
}


export default function* watchers() {
	yield takeEvery( types.SET_ADDITIONAL_FIELD_INITIAL_STATE, setInitialState );
	yield takeEvery( types.SET_ADDITIONAL_FIELD_CHANGE, setPristineState );
	yield takeEvery( types.APPEND_ADDITIONAL_FIELD_VALUE, appendFieldValue );
	yield takeEvery( types.REMOVE_ADDITIONAL_FIELD_VALUE, removeFieldValue );
}
