/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Wordpress dependencies
 */
import { dispatch } from '@wordpress/data';
const { apiRequest } = wp;

import { POST_TYPE, STORE_NAME } from './index';

export async function getDetails( state, id, organizer ) {
	const { blocks } = state;
	const block = blocks[ id ] || {};
	const post = get( block, 'post', {} );
	if ( ! organizer ) {
		return post;
	}

	const body = await apiRequest( { path: `/wp/v2/${ POST_TYPE }/${ organizer }` } );
	dispatch( STORE_NAME ).setPost( id, body );
}
