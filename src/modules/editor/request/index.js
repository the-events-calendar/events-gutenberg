/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { getResponseHeaders } from 'utils/request';

const BASE = '/wp/v2';

export const wpRequest = ( meta = {} ) => {
	const {
		url = '',
		params = {},
		onSuccess = noop,
		onError = noop,
	} = meta;

	const { apiRequest } = wp;

	apiRequest( {
		...params,
		path: `${ BASE }/${ url }`,
	} ).then( ( body, status, xhr ) => {
		const headers = getResponseHeaders( xhr );
		onSuccess( { body, headers, status, xhr } );
	} ).fail( ( error ) => {
		onError( error );
	} );
};
