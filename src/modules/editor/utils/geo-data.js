import { get } from 'lodash';

const list = {
	countries: get( window, 'tribe_data_countries', {} ),
	us_states: get( window, 'tribe_data_us_states', {} ),
};

/**
 * Convert data from an array with different keys and values into a unified shape of object.
 *
 * @param {object} data An object with the data used to retrieve the data
 * @returns {{code: string, name: *}[]} Return an object with code, name values
 */
function toObject( data = {} ) {
	return Object.keys( data ).map( ( key ) => {
		return {
			code: key,
			name: data[ key ],
		};
	} );
}

/**
 * Return the list of all the countries presented by the localized variable: tribe_data_countries
 *
 * @returns {{code: string, name: *}[]} An object with the list of countries
 */
export function getCountries() {
	return toObject( list.countries );
}

/**
 * Return the list of al the states based on the country code
 *
 * @param {string} countryCode The code of the country from where the states are going to be returned
 * @returns {{code: string, name: *}[]} An object with the list of the States
 */
export function getStates( countryCode ) {
	switch ( countryCode ) {
		case 'US':
			return toObject( list.us_states );
		default:
			return [];
	}
}

export default list;
