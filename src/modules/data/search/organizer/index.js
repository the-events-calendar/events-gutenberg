/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
import { stringify } from 'querystringify';

/**
 * Wordpress dependencies
 */
import { registerStore, dispatch, select } from '@wordpress/data';
import { POST_TYPE } from 'data/organizers';
import { getResponseHeaders } from 'utils/request';

import * as actions from './actions';
import * as selectors from './selectors';
import * as resolvers from './resolvers';

const { apiRequest } = wp;

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
				};

			case 'SEARCH': {
				return search( state, action.search, action.payload );
			}

			case 'FETCH': {
				return fetch( state, action.payload );
			}
		}
		return state;
	},
	actions,
	selectors,
	resolvers,
} );

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
