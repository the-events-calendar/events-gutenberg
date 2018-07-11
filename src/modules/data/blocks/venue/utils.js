/**
 * External dependencies
 */
import { isEmpty, get } from 'lodash';

export const getAddress = ( details = {} ) => {
	const { meta = {} } = details;

	if ( isEmpty( meta ) ) {
		return {};
	}

	return {
		street: get( meta, '_VenueAddress', '' ),
		city: get( meta, '_VenueCity', '' ),
		province: get( meta, '_VenueProvince', '' ),
		zip: get( meta, '_VenueZip', '' ),
		country: get( meta, '_VenueCountry', '' ),
	};
};

export const getCoordinates = ( details = {} ) => {
	const { meta = {} } = details;
	const { _VenueLat = '', _VenueLng = '' } = meta;
	const lat = parseFloat( _VenueLat );
	const lng = parseFloat( _VenueLng );

	return {
		lat: isNaN( lat ) ? null : lat,
		lng: isNaN( lng ) ? null : lat,
	};
};
