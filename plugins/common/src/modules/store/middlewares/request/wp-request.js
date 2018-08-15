/**
 * External dependencies
 */
import { noop, get } from 'lodash';

/**
 * Internal dependencies
 */
import { types } from '@moderntribe/common/store/middlewares/request';
import { getResponseHeaders } from '@moderntribe/events/editor/utils/request';

export const BASE = '/wp/v2';

export default () => ( next ) => ( action ) => {
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

	const { apiRequest } = wp;
	const url = `${ BASE }/${ path }`;

	actions.start( url, params );

	return apiRequest( {
		...params,
		path: url,
	} ).then( ( body, status = '', xhr = {} ) => {
		const headers = getResponseHeaders( xhr );
		actions.success( { body, headers, status, xhr } );
	} ).fail( ( error ) => {
		actions.error( error );
	} );
};
