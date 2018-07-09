/**
 * Internal dependencies
 */
import { types } from 'data/search';
import { EVENT } from 'editor/post-types';

export const DEFAULT_STATE = {
	term: '',
	results: [],
	page: 1,
	totalPages: 0,
	loading: false,
	type: EVENT,
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_TERM:
			return {
				...state,
				term: action.payload.term,
			};
		case types.SET_POST_TYPE: {
			return {
				...state,
				type: action.payload.type,
			};
		}
		case types.SET_SEARCH_LOADING: {
			return {
				...state,
				loading: action.payload.loading,
			};
		}
		case types.CLEAR_BLOCK:
			return {
				...state,
				...DEFAULT_STATE,
				type: state.type,
			};
		case types.SET_RESULTS:
			return {
				...state,
				results: action.payload.results,
			};
		case types.ADD_RESULTS:
			return {
				...state,
				results: [ ...state.results, ...action.payload.results ],
			};
		case types.SET_PAGE:
			return {
				...state,
				page: action.payload.page,
			};
		case types.SET_TOTAL_PAGES:
			return {
				...state,
				totalPages: action.payload.totalPages,
			};
		default:
			return state;
	}
};
