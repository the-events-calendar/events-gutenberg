/**
 * Internal dependencies
 */
import { EVENT } from '@@plugins/events/editor/post-types';
import { types } from '@@plugins/events/data/details';

export const DEFAULT_STATE = {
	loading: false,
	details: {},
	type: EVENT,
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_DETAILS:
			return {
				...state,
				details: action.payload.details,
			};
		case types.SET_DETAILS_POST_TYPE:
			return {
				...state,
				type: action.payload.type,
			};
		case types.SET_DETAILS_LOADING:
			return {
				...state,
				loading: action.payload.loading,
			};
		default:
			return state;
	}
};
