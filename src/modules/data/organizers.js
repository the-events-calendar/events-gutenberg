import { isNumber } from 'lodash';
import { stringify } from 'querystringify';

const { data, apiRequest } = wp;
const { registerStore, dispatch } = data;
import { getResponseHeaders } from 'utils/request';
import { STORE_NAME as EVENT_DETAILS_STORE } from 'data/details';
import { POST_TYPE } from 'data/organizers/block';

const DEFAULT_STATE = {
	posts: [],
	page: 1,
	total: 0,
	fetching: false,
	details: [],
	type: 'tribe_organizer',
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
		setSearch( term ) {
			return {
				type: 'SET_SEARCH_TERM',
				search: term,
			};
		},
	},

	selectors: {
		fetch( state, queryParams, requestParams ) {
			return state.posts;
		},
		fetchDetails( state, organizers ) {
			return state;
		}
	},

	resolvers: {
		async fetch( state = {}, queryParams = {}, requestParams = {} ) {
			const { page, total, fetching, type } = state;

			if ( fetching || total && page > total ) {
				return;
			}

			const query = Object.assign( {}, {
				per_page: 25,
				orderby: 'title',
				status: [ 'draft', 'publish' ],
				order: 'asc',
				page,
			}, queryParams );

			dispatch( STORE_NAME ).block();
			dispatch( STORE_NAME ).setSearch( query.search || '' );

			apiRequest( {
				path: `/wp/v2/${ type }?${ stringify( query ) }`,
			} ).then( ( body, status, xhr ) => {
				const headers = getResponseHeaders( xhr );
				let totalPages = parseInt( headers[ 'x-wp-totalpages' ], 10 );
				totalPages = isNaN( totalPages ) ? 0 : totalPages;

				dispatch( STORE_NAME ).setPage( page + 1 );
				dispatch( STORE_NAME ).setTotal( totalPages );
				dispatch( STORE_NAME ).addPosts( body );
				dispatch( STORE_NAME ).unblock();
			} );
		},
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
	return apiRequest( {
		path: `/wp/v2/${ POST_TYPE }/${ id }`,
	} );
}
