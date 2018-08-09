/**
 * Internal dependencies
 */
import { EVENT } from 'editor/post-types';
import { types } from 'data/details';

export const DEFAULT_STATE = {
	isLoading: false,
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
		case types.SET_POST_TYPE:
			return {
				...state,
				postType: action.payload.postType,
			};
		case types.SET_IS_LOADING:
			return {
				...state,
				isLoading: action.payload.isLoading,
			};
		default:
			return state;
	}
};
