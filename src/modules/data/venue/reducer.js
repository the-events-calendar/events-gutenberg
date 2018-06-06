/**
 * External imports
 */
import { isEmpty, get } from 'lodash';
import { dispatch } from '@wordpress/data';

const { apiRequest } = wp;

/**
 * Internal imports
 */
import { STORE_NAME, POST_TYPE } from './index';

export const getAddress = ( meta = {} ) => {
	if ( isEmpty( meta ) ) {
		return {};
	}

	const {
		_VenueAddress,
		_VenueCity,
		_VenueProvince,
		_VenueZip,
		_VenueCountry,
	} = meta;

	return {
		street: _VenueAddress,
		city: _VenueCity,
		province: _VenueProvince,
		zip: _VenueZip,
		country: _VenueCountry,
	};
};

export const getCoordinates = ( meta = {} ) => {
	const { _VenueLat, _VenueLng } = meta;
	const lat = parseFloat( _VenueLat );
	const lng = parseFloat( _VenueLng );

	return {
		lat: isNaN( lat ) ? null : lat,
		lng: isNaN( lng ) ? null : lat,
	};
};

export const createDraft = ( state, fields ) => {
	apiRequest( {
		path: `/wp/v2/${ POST_TYPE }`,
		method: 'POST',
		data: fields,
	} ).then( ( body ) => {
		const { id } = body;
		dispatch( STORE_NAME ).registerVenue( id );
		dispatch( STORE_NAME ).setDetails( id, { ...body, volatile: true } );
	} );

	return {
		...state,
		loading: true,
		submit: true,
	};
};

export const editDraft = ( state, id, fields ) => {
	apiRequest( {
		path: `/wp/v2/${ POST_TYPE }/${ id }`,
		method: 'PUT',
		data: fields,
	} ).then( ( body ) => {
		dispatch( STORE_NAME ).setDetails( body.id, { ...body, volatile: true } );
	} );

	return {
		...state,
		loading: true,
		submit: true,
	};
};

export const removeDraft = ( state, id ) => {
	apiRequest( {
		path: `/wp/v2/${ POST_TYPE }/${ id }`,
		method: 'DELETE',
	} ).then( () => {
		dispatch( STORE_NAME ).clear();
	} );

	return {
		...state,
		loading: true,
	};
};

export const setDetails = ( prevState, id, details ) => {
	const meta = get( details, 'meta', {} );
	return {
		...prevState,
		id,
		details,
		address: getAddress( meta ),
		coordinates: getCoordinates( meta ),
		edit: false,
		create: false,
		loading: false,
		submit: false,
	};
};
