/**
 * Internal dependencies
 */
import * as types from './types';
import {
	actions as requestActions,
	utils as requestUtils,
} from 'data/request';
import { selectors } from 'data/search/index';

export const addBlock = ( id ) => ( {
	type: types.ADD_BLOCK,
	payload: {
		id,
	},
} );

export const setTerm = ( id, term ) => ( {
	type: types.SET_TERM,
	payload: {
		id,
		term,
	},
} );

export const setResults = ( id, results ) => ( {
	type: types.SET_RESULTS,
	payload: {
		id,
		results,
	},
} );

export const addResults = ( id, results ) => ( {
	type: types.ADD_RESULTS,
	payload: {
		id,
		results,
	},
} );

export const setTotalPages = ( id, totalPages ) => ( {
	type: types.SET_TOTAL_PAGES,
	payload: {
		id,
		totalPages,
	},
} );

export const setPage = ( id, page ) => ( {
	type: types.SET_PAGE,
	payload: {
		id,
		page,
	},
} );

export const enableLoading = ( id ) => ( {
	type: types.SET_SEARCH_LOADING,
	payload: {
		id,
		loading: true,
	},
} );

export const disableLoading = ( id ) => ( {
	type: types.SET_SEARCH_LOADING,
	payload: {
		id,
		loading: false,
	},
} );

export const clearBlock = ( id ) => ( {
	type: types.CLEAR_BLOCK,
	payload: {
		id,
	},
} );

export const search = ( id, params ) => ( dispatch, getState ) => {
	const {
		term = '',
		exclude = [],
		perPage = 50,
		populated = false,
		page = 1,
	} = params;

	const total = selectors.getTotal( getState(), { name: id } );

	if ( total !== 0 && page > total ) {
		return;
	}

	dispatch( setTerm( id, term ) );

	if ( populated && term.trim() === '' ) {
		dispatch( clearBlock( id ) );
		return;
	}

	const query = requestUtils.toWPQuery( {
		per_page: perPage,
		search: term,
		page,
		exclude,
	} );

	const type = selectors.getSearchType( getState(), { name: id } );
	const options = {
		path: `${ type }?${ query }`,
		actions: {
			start: () => dispatch( enableLoading( id ) ),
			success: ( { body, headers } ) => {
				if ( term !== selectors.getSearchTerm( getState(), { name: id } ) ) {
					return;
				}
				dispatch( disableLoading( id ) );
				if ( page === 1 ) {
					dispatch( setResults( id, body ) );
				} else {
					dispatch( addResults( id, body ) );
				}
				dispatch( setPage( id, page ) );
				dispatch( setTotalPages( id, requestUtils.getTotalPages( headers ) ) );
			},
			error: () => dispatch( disableLoading( id ) ),
		},
	};

	dispatch( requestActions.wpRequest( options ) );
};

export const setPostType = ( id, type ) => ( {
	type: types.SET_POST_TYPE,
	payload: {
		id,
		type,
	},
} );

export const registerBlock = ( name, postType ) => ( dispatch ) => {
	dispatch( addBlock( name ) );
	dispatch( setPostType( name, postType ) );
};
