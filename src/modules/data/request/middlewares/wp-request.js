/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { types } from 'data/request';
import { getResponseHeaders } from 'utils/request';

export const BASE = '/wp/v2';

export default () => ( next ) => ( action ) => {
	if ( action.type !== types.WP_REQUEST ) {
		return next( action );
	}

	const { meta = {} } = action;

	const {
		path = '',
		params = {},
		actions = {
			start: noop,
			success: noop,
			error: noop,
			none: noop,
		},
	} = meta;

	next( action );

	if ( path === '' ) {
		actions.none( path );
		return;
	}

	const { apiRequest } = wp;
	const url = `${ BASE }/${ path }`;

	actions.start( url, params );

	apiRequest( {
		...params,
		path: url,
	} ).then( ( body, status, xhr ) => {
		const headers = getResponseHeaders( xhr );
		actions.success( { body, headers, status, xhr } );
	} ).fail( ( error ) => {
		actions.error( error );
	} );
}
