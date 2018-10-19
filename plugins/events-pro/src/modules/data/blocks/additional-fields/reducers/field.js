/**
 * Internal dependencies
 */
import { types } from '@moderntribe/events-pro/data/blocks/additional-fields';

export const DEFAULT_STATE = {
	isPristine: true,
	value: '',
	type: '',
	options: [],
	dividerList: '',
	dividerEnd: '',
	name: '',
};

export default ( state = DEFAULT_STATE, action ) => {
	const { payload = {} } = action;
	switch ( action.type ) {
		case types.ADD_ADDITIONAL_FIELD:
		case types.SET_ADDITIONAL_FIELD_NAME:
			return {
				...state,
				name: payload.name,
			};
		case types.SET_ADDITIONAL_FIELD_VALUE:
			return {
				...state,
				value: payload.value,
			};
		case types.SET_ADDITIONAL_FIELD_TYPE:
			return {
				...state,
				type: payload.type,
			};
		case types.SET_ADDITIONAL_FIELD_IS_PRISTINE:
			return {
				...state,
				isPristine: payload.isPristine,
			};
		case types.SET_ADDITIONAL_FIELD_OPTIONS:
			return {
				...state,
				options: payload.options,
			};
		case types.SET_ADDITIONAL_FIELD_DIVIDER_LIST:
			return {
				...state,
				dividerList: payload.dividerList,
			};
		case types.SET_ADDITIONAL_FIELD_DIVIDER_END:
			return {
				...state,
				dividerEnd: payload.dividerEnd,
			};
		default:
			return state;
	}
}
