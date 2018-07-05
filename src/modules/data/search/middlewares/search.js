/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
import { stringify } from 'querystringify';

/**
 * Internal dependencies
 */
import { types, actions, selectors } from 'data/search';
import { EVENT } from 'editor/post-types';
import { wpRequest } from 'editor/request';

export default ( { dispatch, getState } ) => ( next ) => ( action ) => {
	if ( action.type !== types.SEARCH ) {
		next( action );
		return;
	}

	const { payload = {} } = action;
	const { id, term, exclude = [], results = 5, type = EVENT } = payload;
	const {
		setTerm,
		enableLoading,
		disableLoading,
		setResults,
		setTotalPages,
		setPage,
		clearBlock,
	} = actions;

	dispatch( setTerm( id, term ) );

	if ( term.trim() === '' ) {
		dispatch( clearBlock( id ) );
		return next( action );
	}

	dispatch( enableLoading( id ) );

	const params = {
		orderby: 'relevance',
		per_page: results,
		status: [ 'draft', 'publish' ],
		order: 'asc',
		page: 1,
		search: term,
	};

	if ( ! isEmpty( exclude ) ) {
		params.exclude = exclude;
	}

	const url = `${ type }?${ stringify( params ) }`;

	wpRequest( {
		url,
		onSuccess: ( { headers, body } ) => {
			const state = getState();
			if ( term !== selectors.getSearchTerm( state, { name: id } ) ) {
				return;
			}

			let totalPages = parseInt( headers[ 'x-wp-totalpages' ], 10 );
			totalPages = isNaN( totalPages ) ? 0 : totalPages;

			next( action );
			dispatch( disableLoading( id ) );
			dispatch( setResults( id, body ) );
			dispatch( setPage( id, 1 ) );
			dispatch( setTotalPages( id, totalPages ) );
		},
		onError: () => {
			next( action );
			dispatch( disableLoading( id ) );
		},
	});
};
