import { getItems } from './../../elements/timezone-picker/element';
import { get } from 'lodash';

/**
 * Internal dependencies
 */

const WPDateSettings = get( window, 'tribe_date_settings', {} );
const { formats } = WPDateSettings;

export const FORMATS = {
	TIME: 'HH:mm:ss',
	DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
	WP: {
		...formats,
		time: 'g:i a',
		date: 'F j, Y',
		datetime: 'F j, Y g:i a',
		dateNoYear: 'F j',
	},
};

export const TODAY = new Date();

/**
 * Make sure all the Dates objects are on the same time
 *
 * @param {Date} params 0 to N set of Dates params
 * @returns {boolean} true if all the dates have the same timestamp
 */
export function equalDates( ...params ) {
	if ( params.length === 0 ) {
		return false;
	}

	const dates = params.filter( ( item ) => item instanceof Date );
	const [ first, ...rest ] = dates;

	return (
		dates.length === params.length &&
		rest.every( ( item ) => item.getTime() === first.getTime() )
	);
}

export function equalYears( date1, date2 ) {
	return date1.getFullYear() === date2.getFullYear();
}

export function timezonesAsSelectData() {
	return timezones().map( ( tzone ) => {
		return {
			value: tzone.key,
			label: tzone.text,
		};
	} );
}

export function timezones() {
	return getItems()
		.map( ( group ) => group.options || [] )
		.reduce( ( prev, current ) => [ ...prev, ...current ], [] );
}
