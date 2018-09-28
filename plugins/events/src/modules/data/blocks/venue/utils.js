/**
 * External dependencies
 */
import { isEmpty, get } from 'lodash';
import { getStateName } from '@moderntribe/events/editor/utils/geo-data';

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
		lng: isNaN( lng ) ? null : lng,
	};
};

/**
 * Get Venue Address
 */
export function getVenueAddress( meta ) {
	let address = get( meta, '_VenueAddress', '' );

	if ( '' === address ) {
		const defaultAddress = tribe_blocks_editor_defaults.venueAddress;
		address = defaultAddress ? defaultAddress : '';
	}
	return address;
}

/**
 * Get Venue City
 */
export function getVenueCity( meta ) {
	let city = get( meta, '_VenueCity', '' );

	if ( '' === city ) {
		const defaultCity = tribe_blocks_editor_defaults.venueCity;
		city = defaultCity ? defaultCity : '';
	}
	return city;
}

/**
 * Get Venue Country
 */
export function getVenueCountry( meta ) {
	let country = get( meta, '_VenueCountry', '' );

	if ( '' === country ) {
		const defaultCountry = tribe_blocks_editor_defaults.venueCountry;
		country = defaultCountry !== undefined || array.length > 0 ? defaultCountry[1] : '';
	}
	return country;
}

/**
 * Get Venue State/Province
 */
export function getVenueStateProvince( meta ) {
	let stateProvince = get( meta, '_VenueStateProvince', '' );

	if ( '' === stateProvince ) {

		const country = getVenueCountry( meta );

		if (
			'US' === country
			|| 'United States' === country
		) {
			stateProvince = getStateName( 'US', tribe_blocks_editor_defaults.venueState );
		} else {
			stateProvince = tribe_blocks_editor_defaults.venueProvince;
		}
	}
	return stateProvince;
}

/**
 * Get Venue ZIP
 */
export function getVenueZip( meta ) {
	let zip = get( meta, '_VenueZip', '' );

	if ( '' === zip ) {
		const defaultZip = tribe_blocks_editor_defaults.venueZip;
		zip = defaultZip ? defaultZip : '';
	}
	return zip;
}

/**
 * Get Venue Phone
 */
export function getVenuePhone( meta ) {
	let phone = get( meta, '_VenuePhone', '' );

	if ( '' === phone ) {
		const defaultPhone = tribe_blocks_editor_defaults.venuePhone;
		phone = defaultPhone ? defaultPhone : '';
	}
	return phone;
}

/**
 * Get Venue URL
 */
export function getVenueUrl( meta ) {
	return get( meta, '_VenueURL', '' );
}
