/**
 * Internal dependencies
 */
import * as types from './types';
import { EVENT } from 'editor/post-types';

export const DEFAULT_STATE = {
	term: '',
	results: [],
	page: 1,
	totalPages: 0,
	loading: false,
	postType: EVENT,
};

export default ( state = {}, action ) => {
	switch ( action.type ) {
		case types.ADD_BLOCK:
			return {
				...state,
				[ action.payload.id ]: DEFAULT_STATE,
			};
		case types.CLEAR_BLOCK:
			return {
				...state,
				[ action.payload.id ]: {
					...DEFAULT_STATE,
					postType: state[ action.payload.id ].postType
				},
			};
		case types.SET_TERM:
			return {
				...state,
				[ action.payload.id ]: {
					...state[ action.payload.id ],
					term: action.payload.term,
				},
			};
		case types.SET_RESULTS:
			return {
				...state,
				[ action.payload.id ]: {
					...state[ action.payload.id ],
					results: action.payload.results,
				},
			};
		case types.ADD_RESULTS:
			return {
				...state,
				[ action.payload.id ]: {
					...state[ action.payload.id ],
					results: [ ...state[ action.payload.id ], ...action.payload.results ],
				},
			};
		case types.SET_PAGE:
			return {
				...state,
				[ action.payload.id ]: {
					...state[ action.payload.id ],
					page: action.payload.results,
				},
			};
		case types.SET_TOTAL_PAGES:
			return {
				...state,
				[ action.payload.id ]: {
					...state[ action.payload.id ],
					totalPages: action.payload.totalPages,
				},
			};
		case types.SET_LOADING:
			return {
				...state,
				[ action.payload.id ]: {
					...state[ action.payload.id ],
					loading: action.payload.loading,
				},
			};
		case types.SET_POST_TYPE:
			return {
				...state,
				[ action.payload.id ]: {
					...state[ action.payload.id ],
					postType: action.payload.results,
				},
			};
		default:
			return state;
	}
};
