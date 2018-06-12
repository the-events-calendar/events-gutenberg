import { stringify } from 'querystringify';

import { select } from '@wordpress/data';

const { data, apiRequest } = wp;
const { registerStore } = data;
import { getResponseHeaders } from 'utils/request';

const DEFAULT_STATE = {
	results: [],
	page: 1,
	total: 0,
	loading: false,
	type: 'tribe_venue',
	search: '',
};

export const STORE_NAME = 'tec.venues';
export const store = registerStore( STORE_NAME, {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SEARCH': {
				return search( state, action.payload );
			}
			case 'SET_TERM': {
				return {
					...state,
					search: action.term,
				};
			}
			case 'CLEAR_SEARCH':
			case 'CLEAR': {
				return {
					...state,
					results: [],
					loading: false,
					search: '',
				};
			}
			case 'SET_RESULTS': {
				return {
					...state,
					...action.response,
				};
			}
			default: {
				return state;
			}
		}
	},
	selectors: {
		getSearch( state ) {
			return state.search || '';
		},
		getPosts( state ) {
			const { results, loading } = state;
			return {
				results,
				loading,
			};
		},
		getLoading( state ) {
			return state.loading;
		},
		getSearchLoading( state ) {
			return state.loading;
		},
		getResults( state ) {
			return state.results;
		},
	},
	actions: {
		setTerm( id, term ) {
			return {
				type: 'SET_TERM',
				term,
			};
		},
		clear( id ) {
			return {
				type: 'CLEAR',
				results: [],
				id,
			};
		},
		clearSearch() {
			return {
				type: 'CLEAR_SEARCH',
			};
		},
		search( id, payload ) {
			return {
				type: 'SEARCH',
				id,
				payload,
			};
		},
	},
} );

function search( state, payload ) {
	const { params } = payload;
	const term = payload.search;

	const { page, total, type } = state;
	if ( total && page > total || term === '' ) {
		return state;
	}

	const query = {
		per_page: 30,
		orderby: 'title',
		status: [ 'draft', 'publish' ],
		order: 'asc',
		page,
		search: term,
		...params,
	};

	apiRequest( {
		path: `/wp/v2/${ type }?${ stringify( query ) }`,
	} ).then( ( body, status, xhr ) => {
		const headers = getResponseHeaders( xhr );
		let totalPages = parseInt( headers[ 'x-wp-totalpages' ], 10 );
		totalPages = isNaN( totalPages ) ? 0 : totalPages;

		// Prevent responses from old searches to be stored.
		const currentTerm = select( STORE_NAME ).getSearch();
		if ( currentTerm.trim() !== term.trim() ) {
			return;
		}

		store.dispatch( {
			type: 'SET_RESULTS',
			response: {
				total: totalPages,
				page: 1,
				results: body,
				loading: false,
			},
		} );
	} );

	return {
		...state,
		search: term,
		loading: true,
	};
}
