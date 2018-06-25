/**
 * External dependencies
 */
import { isNumber } from 'lodash';

/**
 * Wordpress dependencies
 */
import { dispatch } from '@wordpress/data';
const { apiRequest } = wp;

/**
 * Internal dependencies
 */
import { STORE_NAME as EVENT_DETAILS_STORE } from 'data/details';
import { POST_TYPE } from 'data/organizers';

export async function fetchDetails( state = {}, organizers ) {
	const filtered = organizers.filter( isNumber );
	Promise.all( filtered.map( toPromise ) )
		.then( ( result ) => {
			dispatch( EVENT_DETAILS_STORE ).replaceOrganizers( result );
		} );
	return state;
}

function toPromise( id ) {
	return apiRequest( { path: `/wp/v2/${ POST_TYPE }/${ id }` } );
}
