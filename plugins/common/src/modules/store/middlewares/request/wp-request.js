/**
 * External dependencies
 */
import { noop, get } from 'lodash';
import 'whatwg-fetch';

/**
 * Internal dependencies
 */
import { config } from '@moderntribe/common/utils/globals';
import { types } from '@moderntribe/common/store/middlewares/request';

export default () => ( next ) => ( action ) => {
	const REST = get( config(), 'REST', {} )
	const { url = '', nonce = '' } = REST;
	const BASE = `${ url }wp/v2`;

	if ( action.type !== types.WP_REQUEST ) {
		return next( action );
	}

	const { meta = {} } = action;

	const {
		path = '',
		params = {},
	} = meta;

	next( action );

	const actions = {
		start: noop,
		success: noop,
		error: noop,
		none: noop,
		...get( meta, 'actions', {} ),
	};

	if ( path === '' ) {
		actions.none( path );
		return;
	}

	const endpoint = `${ BASE }/${ path }`;

	actions.start( endpoint, params );

	const headers = {
		'Content-Type': 'application/json',
		...get( params, 'headers', {} ),
		'X-WP-Nonce': nonce,
	};

	return fetch( endpoint, {
		...params,
		credentials: 'include',
		headers,
	} ).then( ( response ) => {
		const { status } = response;
		if ( status !== 200 ) {
			throw response;
		}
		return Promise.all( [ response, response.json() ] );
	} )
		.then( ( results ) => {
			const [ response, body ] = results;
			actions.success( { body, headers: response.headers } );
			return results;
		} ).catch( ( error ) => {
			actions.error( error );
			return error;
		} );
};
