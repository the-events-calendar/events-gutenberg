import { get } from 'lodash';

/**
 * Convert data from an array with different keys and values into a unified shape of object.
 *
 * @param data
 * @returns {{code: string, name: *}[]}
 */
function toObject( data = {} ) {
	return Object.keys( data ).map( (key) => {
		return {
			code: key,
			name: data[key]
		}
	});
}

/**
 * Return the list of all the countries presented by the localized variable: tribe_data_countries
 *
 * @returns {{code: string, name: *}[]}
 */
export function getCountries() {
	return toObject( get( window, 'tribe_data_countries', {} ) );
}

/**
 * Return the list of al the states based on the country code
 *
 * @param countryCode
 * @returns {{code: string, name: *}[]}
 */
export function getStates( countryCode ) {
	switch ( countryCode ) {
		case 'US':
			return toObject( get( window, 'tribe_data_us_states', {} ) );
			break;
		default:
			return [];
			break;
	}
}

/**
 * Get name from a container object based on the code of the element otherwise an empty string.
 *
 * @param code
 * @param container
 * @returns {*|string}
 */
export function getName( code, container ) {
	return container[ code ] || '';
}