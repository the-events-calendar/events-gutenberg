/**
 * Internal dependencies
 */
import * as actions from './actions';
import * as selectors from './selectors';
import {
	actions as requestActions,
	utils as requestUtils,
} from 'data/request';

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

	if ( populated && term.trim() === '' ) {
		dispatch( actions.clearBlock( id ) );
		return;
	}

	const query = requestUtils.toWPQuery( {
		per_page: perPage,
		search: term,
		page,
		exclude,
	} );

	const postType = selectors.getSearchPostType( getState(), { name: id } );
	const options = {
		path: `${ postType }?${ query }`,
		actions: {
			start: () => dispatch( actions.enableIsLoading( id ) ),
			success: ( { body, headers } ) => {
				if ( term !== selectors.getSearchTerm( getState(), { name: id } ) ) {
					return;
				}
				dispatch( actions.disableIsLoading( id ) );
				if ( page === 1 ) {
					dispatch( actions.setResults( id, body ) );
				} else {
					dispatch( actions.addResults( id, body ) );
				}
				dispatch( actions.setPage( id, page ) );
				dispatch( actions.setTotalPages( id, requestUtils.getTotalPages( headers ) ) );
			},
			error: () => dispatch( actions.disableIsLoading( id ) ),
		},
	};

	dispatch( requestActions.wpRequest( options ) );
};
