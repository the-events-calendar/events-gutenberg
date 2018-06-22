/**
 * Wordpress Imports
 */
import { dispatch } from '@wordpress/data';

const { apiRequest } = wp;

/**
 * Internal dependencies
 */
import { POST_TYPE, STORE_NAME } from './index';

export async function getDetails( state, id ) {
	if ( state.id === id ) {
		return state;
	}

	apiRequest( { path: `/wp/v2/${ POST_TYPE }/${ id }` } )
		.then( ( body ) => dispatch( STORE_NAME ).setDetails( body.id, body ) );

	return {
		...state,
		loading: true,
	};
}
