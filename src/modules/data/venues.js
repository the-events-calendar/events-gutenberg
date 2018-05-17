import { stringify } from 'querystringify';

const { data, apiRequest } = wp;
const { registerStore, dispatch, select } = data;
import { getResponseHeaders } from 'utils/request';

const DEFAULT_STATE = {
	posts: [],
	page: 1,
	total: 0,
	fetching: false,
	type: 'tribe_venue',
	search: '',
};

export const STORE_NAME = 'tec.venues';
export const store = registerStore( STORE_NAME, {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_PAGE':
				return {
					...state,
					page: action.page,
				};

			case 'ADD_POSTS':
				return {
					...state,
					posts: [
						...state.posts,
						...action.posts,
					],
				};

			case 'SET_POSTS':
				return {
					...state,
					posts: [
						...action.posts,
					],
				};

			case 'SET_TOTAL':
				return {
					...state,
					total: action.total,
				};

			case 'SET_FETCHING':
				return {
					...state,
					fetching: action.fetching,
				};

			case 'SEARCH_POSTS':
				return {
					...state,
					search: action.search.trim(),
				};
		}
		return state;
	},

	actions: {
		setSearch( search ) {
			return {
				type: 'SEARCH_POSTS',
				search,
			};
		},
		setPage( page ) {
			return {
				type: 'SET_PAGE',
				page,
			};
		},
		setTotal( total ) {
			return {
				type: 'SET_TOTAL',
				total,
			};
		},
		setPosts( posts ) {
			return {
				type: 'SET_POSTS',
				posts,
			};
		},
		addPosts( posts ) {
			return {
				type: 'ADD_POSTS',
				posts,
			};
		},
		block( ) {
			return {
				type: 'SET_FETCHING',
				fetching: true,
			};
		},
		unblock() {
			return {
				type: 'SET_FETCHING',
				fetching: false,
			};
		},
	},

	selectors: {
		getSearchTerm( state ) {
			return state.search;
		},
		fetch( state, queryParams ) {
			return state.posts;
		},
	},

	resolvers: {
		async fetch( state = {}, queryParams = {} ) {
			const { page, total, fetching, type } = state;
			if ( fetching || total && page > total ) {
				return;
			}

			const query = Object.assign( {}, {
				per_page: 30,
				orderby: 'title',
				status: [ 'draft', 'publish' ],
				order: 'asc',
				page,
			}, queryParams );

			const search = query.search || '';
			dispatch( STORE_NAME ).setSearch( search );
			dispatch( STORE_NAME ).block();

			apiRequest( {
				path: `/wp/v2/${ type }?${ stringify( query ) }`,
			} ).then( ( body, status, xhr ) => {
				const headers = getResponseHeaders( xhr );
				let totalPages = parseInt( headers[ 'x-wp-totalpages' ], 10 );
				totalPages = isNaN( totalPages ) ? 0 : totalPages;

				// Prevent responses from old searches to be stored.
				if ( select( STORE_NAME ).getSearchTerm() !== search ) {
					return;
				}

				dispatch( STORE_NAME ).setTotal( totalPages );
				dispatch( STORE_NAME ).setPage( page + 1 );
				if ( page === 1 ) {
					dispatch( STORE_NAME ).setPosts( body );
				} else {
					dispatch( STORE_NAME ).addPosts( body );
				}
				dispatch( STORE_NAME ).unblock();
			} );
		},
	},
} );
