/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import * as actions from './actions';
import * as selectors from './selectors';
import { actions as requestActions } from 'data/request';

export const fetchDetails = ( id ) => ( dispatch, getState ) => {
	const state = getState();
	const props = { name: id };
	const loading = selectors.getLoading( state, props );
	const details = selectors.getDetails( state, props );

	if ( ! isEmpty( details ) || loading ) {
		return;
	}

	const postType = selectors.getPostType( state, props );
	const options = {
		path: `${ postType }/${ id }`,
		actions: {
			start: () => dispatch( actions.enableLoading( id ) ),
			success: ( { body } ) => {
				dispatch( actions.setDetails( id, body ) );
				dispatch( actions.disableLoading( id ) );
			},
			error: () => dispatch( actions.disableLoading( id ) ),
		},
	};

	dispatch( requestActions.wpRequest( options ) );
};
