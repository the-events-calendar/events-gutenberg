/**
 * External dependencies
 */
import { stringify } from 'querystringify';
import { isEmpty } from 'lodash';
/**
 * Internal dependencies
 */
import * as types from './types';
import * as actions from './actions';
import {
	actions as requestActions,
	types as requestTypes,
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

export const search = ( id, term, exclude, resultsPerPage ) => ( dispatch, getState ) => {

	dispatch( setTerm( id, term ) );

	if ( term.trim() === '' ) {
		dispatch( clearBlock( id ) );
		return;
	}

	const query = requestUtils.toWPQuery( {
		per_page: resultsPerPage,
		search: term,
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
				dispatch( setResults( id, body ) );
				dispatch( setPage( id, 1 ) );
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
