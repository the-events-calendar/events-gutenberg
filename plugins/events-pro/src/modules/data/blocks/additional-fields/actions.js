/**
 * Internal dependencies
 */
import { types } from '@moderntribe/events-pro/data/blocks/additional-fields';

export const addField = ( name ) => ( {
	type: types.ADD_ADDITIONAL_FIELD,
	payload: {
		name,
	},
} );

export const removeField = ( name ) => ( {
	type: types.REMOVE_ADDITIONAL_FIELD,
	payload: {
		name,
	},
} );

export const setFieldLabel = ( name, label ) => ( {
	type: types.SET_ADDITIONAL_FIELD_LABEL,
	payload: {
		name,
		label,
	},
} );

export const setFieldIsPristine = ( name, isPristine ) => ( {
	type: types.SET_ADDITIONAL_FIELD_IS_PRISTINE,
	payload: {
		name,
		isPristine,
	},
} );

export const setFieldValue = ( name, value ) => ( {
	type: types.SET_ADDITIONAL_FIELD_VALUE,
	payload: {
		name,
		value,
	},
} );

export const setFieldType = ( name, type ) => ( {
	type: types.SET_ADDITIONAL_FIELD_TYPE,
	payload: {
		name,
		type,
	},
} );

export const setFieldOptions = ( name, options ) => ( {
	type: types.SET_ADDITIONAL_FIELD_OPTIONS,
	payload: {
		name,
		options,
	},
} );

export const setFieldDividerList = ( name, dividerList ) => ( {
	type: types.SET_ADDITIONAL_FIELD_DIVIDER_LIST,
	payload: {
		name,
		dividerList,
	},
} );

export const setFieldDividerEnd = ( name, dividerEnd ) => ( {
	type: types.SET_ADDITIONAL_FIELD_DIVIDER_END,
	payload: {
		name,
		dividerEnd,
	},
} );

