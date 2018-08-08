/**
 * Internal dependencies
 */
import { EVENT } from 'editor/post-types';
import { types } from 'data/details';

export const DEFAULT_STATE = {
	loading: false,
	details: {},
	postType: EVENT,
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
				postType: action.payload.postType,
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
