/**
 * Internal dependencies
 */
import { types } from '@moderntribe/events-pro/data/blocks/additional-fields';

export const DEFAULT_STATE = {
	isPristine: true,
	value: '',
	type: '',
	options: [],
	dividerList: ', ',
	dividerEnd: ' & ',
	label: '',
	metaKey: '',
	output: '',
};

export default ( state = DEFAULT_STATE, action ) => {
	const { payload = {} } = action;
	switch ( action.type ) {
		case types.SET_ADDITIONAL_FIELD_LABEL:
			return {
				...state,
				label: payload.label,
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
		case types.SET_ADDITIONAL_FIELD_META_KEY:
			return {
				...state,
				metaKey: payload.metaKey,
			}
		case types.SET_ADDITIONAL_FIELD_OUTPUT:
			return {
				...state,
				output: payload.output,
			}
		default:
			return state;
	}
}
