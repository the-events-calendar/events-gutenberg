/**
 * External dependencies
 */
import { stringify } from 'querystringify';

/**
 * Wordpress dependencies
 */
import { select, registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
const { apiRequest } = wp;
import { getResponseHeaders } from 'utils/request';
import * as actions from './actions';
import * as selectors from './selectors';
import { POST_TYPE } from 'data/venue';

const DEFAULT_STATE = {
	results: [],
	page: 1,
	total: 0,
	loading: false,
	type: POST_TYPE,
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
	selectors,
	actions,
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
