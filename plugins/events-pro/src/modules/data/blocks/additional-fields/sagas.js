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
import { FIELD_TYPES } from '@moderntribe/events-pro/blocks/additional-fields/utils';
import { actions, types, selectors } from '@moderntribe/events-pro/data/blocks/additional-fields';
import { wordsAsList } from '@moderntribe/common/src/modules/utils/string';

export function* setInitialState( props ) {
	const { payload = {} } = props;
	const { name = '', get = noop } = payload;
	const initialValues = get( 'initialValues', {} );

	yield all( [
		put( actions.addField( name ) ),
		put( actions.setFieldIsPristine( name, get( 'isPristine' ) ) ),
		put( actions.setFieldOutput( name, get( 'output' ) ) ),
		put( actions.setFieldType( name, initialValues.type ) ),
		put( actions.setFieldLabel( name, initialValues.label ) ),
		put( actions.setFieldOptions( name, initialValues.options ) ),
		put( actions.setFieldMetaKey( name, initialValues.metaKey ) ),
		put( actions.setFieldValue( name, get( 'value' ) ) ),
		put( actions.setFieldChange( name ) ),
	] );
}

export function* setPristineState( props ) {
	const { payload = {} } = props;
	const { name = '' } = payload;
	const value = yield select( selectors.getFieldValue, payload );
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

export function* onFieldBlur( props ) {
	const { payload = {} } = props;
	const { name = '' } = payload;
	const type = yield select( selectors.getFieldType, payload );
	yield put( actions.setFieldBlurWithType( name, type ) );
}

export function* setTextFieldOutput( props ) {
	const { payload = {} } = props;
	const { name = '' } = payload;
	const value = yield select( selectors.getFieldValue, payload );
	yield put( actions.setFieldOutput( name, value ) );
}

export function* setDropdownOutput( props ) {
	const { payload = {} } = props;
	const { name = '' } = payload;
	const { label = '' } = yield select( selectors.getFieldDropdownValue, payload );
	yield put( actions.setFieldOutput( name, label ) );
}

export function* setCheckboxOutput( props ) {
	const { payload = {} } = props;
	const { name = '' } = payload;
	const { values, listDivider, dividerEnd } = yield all( {
		values: select( selectors.getFieldCheckboxValue, payload ),
		listDivider: select( selectors.getFieldDividerList, payload ),
		dividerEnd: select( selectors.getFieldDividerEnd, payload ),
	} );
	yield put( actions.setFieldOutput( name, wordsAsList( values, listDivider, dividerEnd ) ) );
}

export default function* watchers() {
	yield takeEvery( types.SET_ADDITIONAL_FIELD_INITIAL_STATE, setInitialState );
	yield takeEvery( types.SET_ADDITIONAL_FIELD_CHANGE, setPristineState );
	yield takeEvery( types.APPEND_ADDITIONAL_FIELD_VALUE, appendFieldValue );
	yield takeEvery( types.REMOVE_ADDITIONAL_FIELD_VALUE, removeFieldValue );
	yield takeEvery( types.SET_ADDITIONAL_FIELD_BLUR, onFieldBlur );
	yield takeEvery(
		[
			`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.text }`,
			`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.radio }`,
			`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.url }`,
			`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.textarea }`,
		],
		setTextFieldOutput,
	);
	yield takeEvery(
		`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.dropdown }`,
		setDropdownOutput,
	);
	yield takeEvery(
		`${ types.SET_ADDITIONAL_FIELD_BLUR }/${ FIELD_TYPES.checkbox }`,
		setCheckboxOutput,
	);
}
