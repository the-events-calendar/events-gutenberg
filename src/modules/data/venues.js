import { stringify } from 'querystringify';
import { get } from 'lodash';

const { data, apiRequest } = wp;
const { registerStore } = data;
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
			case 'SEARCH': {
				return search( state, action.search, action.params );
			}
			case 'CLEAR': {
				return {
					...state,
					posts: [],
					fetching: false,
					search: '',
				};
			}
			case 'SET_RESULTS': {
				return {
					...state,
					...action.response,
				}
			}
			default: {
				return state;
			}
		}
	},

} );

function search( state, term, params = {} ) {
	if ( state.search === term ) {
		return state;
	}

	const { page, total, type } = state;
	if ( total && page > total ) {
		return state;
	}

	const query = Object.assign( {}, {
		per_page: 30,
		orderby: 'title',
		status: [ 'draft', 'publish' ],
		order: 'asc',
		page,
		search: term,
	}, params );

	apiRequest( {
		path: `/wp/v2/${ type }?${ stringify( query ) }`,
	} ).then( ( body, status, xhr ) => {
		const headers = getResponseHeaders( xhr );
		let totalPages = parseInt( headers[ 'x-wp-totalpages' ], 10 );
		totalPages = isNaN( totalPages ) ? 0 : totalPages;

		// Prevent responses from old searches to be stored.
		const currentTerm = get( store.getState(), 'search', '' );
		if ( currentTerm.trim() !== term.trim() ) {
			return;
		}

		store.dispatch( {
			type: 'SET_RESULTS',
			response: {
				total: totalPages,
				page: 1,
				posts: body,
				fetching: false,
			},
		} );
	} );

	return {
		...state,
		search: term,
		fetching: true,
	};
}
