import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import * as types from './types';
import * as selectors from './selectors';
import { actions as requestActions } from '@@plugins/events/data/request';

export const enableLoading = ( id ) => ( {
	type: types.SET_DETAILS_LOADING,
	payload: {
		id,
		loading: true,
	},
} );

export const disableLoading = ( id ) => ( {
	type: types.SET_DETAILS_LOADING,
	payload: {
		id,
		loading: false,
	},
} );

export const setDetails = ( id, details ) => ( {
	type: types.SET_DETAILS,
	payload: {
		id,
		details,
	},
} );

export const fetchDetails = ( id ) => ( dispatch, getState ) => {
	const state = getState();
	const props = { name: id };
	const loading = selectors.getLoading( state, props );
	const details = selectors.getDetails( state, props );

	if ( ! isEmpty( details ) || loading ) {
		return;
	}

	const type = selectors.getPostType( state, props );
	const options = {
		path: `${ type }/${ id }`,
		actions: {
			start: () => dispatch( enableLoading( id ) ),
			success: ( { body } ) => {
				dispatch( setDetails( id, body ) );
				dispatch( disableLoading( id ) );
			},
			error: () => dispatch( disableLoading( id ) ),
		},
	};
	dispatch( requestActions.wpRequest( options ) );
};

export const setPostType = ( id, type ) => ( {
	type: types.SET_DETAILS_POST_TYPE,
	payload: {
		id,
		type,
	},
} );
