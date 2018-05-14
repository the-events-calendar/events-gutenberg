/**
 * WordPress dependencies
 */
/**
import { __ } from '@wordpress/i18n';
import { getSetting } from './../settings';
date: getSetting( 'dateWithYearFormat', __( 'F j', 'events-gutenberg' ) ),
	**/

/**
 * Internal dependencies
 */

const WPDateSettings = window.tribe_date_settings || {};
const { formats } = WPDateSettings;

export const FORMATS = {
	TIME: 'HH:mm:ss',
	DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
	WP: {
		datetime: 'F j, Y g:i a',
		time: 'g:i a',
		...formats,
	},
};

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