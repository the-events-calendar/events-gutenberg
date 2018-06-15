import { isNumber, get, isEmpty } from 'lodash';
import { stringify } from 'querystringify';

const { data, apiRequest } = wp;
const { registerStore, dispatch } = data;
import { select } from '@wordpress/data';
import { getResponseHeaders } from 'utils/request';
import { STORE_NAME as EVENT_DETAILS_STORE } from 'data/details';

const POST_TYPE = 'tribe_organizer';

const DEFAULT_STATE = {
	posts: [],
	page: 1,
	total: 0,
	fetching: false,
	details: [],
	search: '',
};

export const STORE_NAME = 'tec.organizers';

export const store = registerStore( STORE_NAME, {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_PAGE':
				return {
					...state,
					page: action.page,
				};

			case 'SET_POSTS':
				return {
					...state,
					posts: [
						...action.posts,
					],
				};

			case 'ADD_POSTS':
				return {
					...state,
					posts: [
						...state.posts,
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

			case 'SET_SEARCH_TERM':
				return {
					...state,
					search: action.search,
				}

			case 'SEARCH': {
				return search( state, action.search, action.payload );
			}

			case 'FETCH': {
				return fetch( state, action.payload );
			}
		}
		return state;
	},

	actions: {
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
		addPosts( posts ) {
			return {
				type: 'ADD_POSTS',
				posts,
			};
		},
		setPosts( posts ) {
			return {
				type: 'SET_POSTS',
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
		fetch( args ) {
			return {
				type: 'FETCH',
				payload: args,
			};
		},
		search( term, args ) {
			return {
				type: 'SEARCH',
				search: term,
				payload: args,
			};
		},
	},

	selectors: {
		fetchDetails( state, organizers ) {
			return state;
		},
		search( state ) {
			return state.search;
		},
	},

	resolvers: {
		async fetchDetails( state = {}, organizers ) {
			const filtered = organizers.filter( isNumber );
			Promise.all( filtered.map( toPromise ) )
				.then( ( result ) => {
					dispatch( EVENT_DETAILS_STORE ).replaceOrganizers( result );
				} );
			return state;
		}
	},
} );

function toPromise( id ) {
	return apiRequest( { path: `/wp/v2/${ POST_TYPE }/${ id }` } );
}

function fetch( state = {}, queryParams = {} ) {
	const { page, total, fetching } = state;
	const term = state.search;

	if ( fetching ) {
		return state;
	}

	const query = {
		per_page: 50,
		orderby: 'title',
		status: [ 'draft', 'publish' ],
		order: 'asc',
		page: page,
	};

	if ( term ) {
		query.search = term;
		query.orderby = 'relevance';
	}

	const params = { ...query, ...queryParams };
	if ( 'exclude' in params && isEmpty( params.exclude ) ) {
		delete params.exclude;
	}

	if ( total && params.page > total ) {
		return state;
	}

	const request = {
		path: `/wp/v2/${ POST_TYPE }?${ stringify( params ) }`,
	};

	apiRequest( request )
		.then( ( body, status, xhr ) => {
			const headers = getResponseHeaders( xhr );
			let totalPages = parseInt( headers[ 'x-wp-totalpages' ], 10 );
			totalPages = isNaN( totalPages ) ? 0 : totalPages;

			dispatch( STORE_NAME ).setPage( params.page );
			dispatch( STORE_NAME ).setTotal( totalPages );
			dispatch( STORE_NAME ).addPosts( body );
			dispatch( STORE_NAME ).unblock();
		} );

	return {
		...state,
		fetching: true,
	};
}

function search( prevState, term = '', args = {} ) {
	const query = {
		per_page: 50,
		orderby: 'relevance',
		status: [ 'draft', 'publish' ],
		order: 'asc',
		page: 1,
		search: term,
	};

	if ( query.search === '' ) {
		delete query.search;
		query.orderby = 'title';
	}

	const params = { ...query, ...args };

	if ( 'exclude' in params && isEmpty( params.exclude ) ) {
		delete params.exclude;
	}

	const request = {
		path: `/wp/v2/${ POST_TYPE }?${ stringify( params ) }`,
	};

	const state = {
		...prevState,
		search: term,
		posts: [],
		page: 1,
		total: 0,
		fetching: true,
	};

	apiRequest( request )
		.then( ( body, status, xhr ) => {

			if ( term !== select( STORE_NAME ).search() ) {
				return state;
			}

			const headers = getResponseHeaders( xhr );
			let totalPages = parseInt( headers[ 'x-wp-totalpages' ], 10 );
			totalPages = isNaN( totalPages ) ? 0 : totalPages;
			dispatch( STORE_NAME ).setPage( 1 );
			dispatch( STORE_NAME ).setTotal( totalPages );
			dispatch( STORE_NAME ).setPosts( body );
			dispatch( STORE_NAME ).unblock();
		} );

	return state;
}
