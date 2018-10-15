/**
 * Internal dependencies
 */
import { types } from '@moderntribe/common/data/plugins';

export default ( state = {}, action ) => {
	switch ( action.type ) {
		case types.ADD_PLUGIN:
			return {
				...state,
				[ action.payload.name ]: true,
			};
		case types.REMOVE_PLUGIN:
			return {
				...state,
				[ action.payload.name ]: false,
			};
		default:
			return state;
	}
};
