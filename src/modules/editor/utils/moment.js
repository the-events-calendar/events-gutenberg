/**
 * External dependencies
 */
import { escapeRegExp } from 'lodash';
import moment from 'moment/moment';

/**
 * Internal dependencies
 */
import { FORMATS } from './date';

/**
 * Make sure the format provided matches the spec used by moment.js
 *
 * @param {string} format The format to be converted to a moment format
 * @returns {string} return a moment.js valid format
 */
export function toFormat( format ) {
	const strtr = ( str, pairs ) => {
		const substrs = Object.keys( pairs ).map( escapeRegExp );
		return str.split( RegExp( `(${ substrs.join( '|' ) })` ) )
			.map( part => pairs[ part ] || part )
			.join( '' );
	};

	const replacements = {
		d: 'DD',
		D: 'ddd',
		j: 'D',
		l: 'dddd',
		N: 'E',
		S: 'o',
		w: 'e',
		z: 'DDD',
		W: 'W',
		F: 'MMMM',
		m: 'MM',
		M: 'MMM',
		n: 'M',
		t: '', // no equivalent
		L: '', // no equivalent
		o: 'YYYY',
		Y: 'YYYY',
		y: 'YY',
		a: 'a',
		A: 'A',
		B: '', // no equivalent
		g: 'h',
		G: 'H',
		h: 'hh',
		H: 'HH',
		i: 'mm',
		s: 'ss',
		u: 'SSS',
		e: 'zz', // deprecated since version 1.6.0 of moment.js
		I: '', // no equivalent
		O: '', // no equivalent
		P: '', // no equivalent
		T: '', // no equivalent
		Z: '', // no equivalent
		c: '', // no equivalent
		r: '', // no equivalent
		U: 'X',
	};

	return strtr( format, replacements );
}

/**
 * Round the time of a moment object if the minutes on the date is lower than 30 will set to 0 if
 * is greater will se 30 so is either 30 or 0.
 *
 * @param {moment} date Make sure the date is rounded between 0 or 30 minutes
 * @returns {moment} A moment object
 */
export function roundTime( date ) {
	if ( ! ( date instanceof moment ) ) {
		return date;
	}

	let minutes = date.minute();
	if ( minutes >= 30 ) {
		minutes = ( minutes % 30 );
	}

	return date
		.subtract( minutes, 'm' )
		.seconds( 0 );
}

/**
 * Convert a Date() object into a Moment.js object avoiding warnings of different formats
 * used by Date
 *
 * @param {Date} date The date to be converted.
 * @returns {moment} A moment object
 */
export function toMoment( date ) {
	if ( ! ( date instanceof Date ) ) {
		throw new Error( 'Make sure your date is an instance of Date' );
	}

	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	return moment()
		.year( year )
		.month( month )
		.date( day )
		.startOf( 'day' );
}

/**
 * Replace the date of a moment object with another date from another moment object
 *
 * @param {moment} original The moment object where the date is going to be replaced
 * @param {moment} replaced The moment object where the date to be used to replace is located
 * @returns {moment} A moment object where the date is replaced
 */
export function replaceDate( original, replaced ) {
	if ( ! ( original instanceof moment ) || ! ( replaced instanceof moment ) ) {
		throw new Error( 'Make sure your values are instances of moment' );
	}

	return original
		.year( replaced.year() )
		.month( replaced.month() )
		.date( replaced.date() );
}

/**
 * Set time in seconds to a moment object
 *
 * @param {moment} original The original moment where the date is going to be set
 * @param {number} seconds Amount of seconds to be set to the moment object.
 * @returns {moment} A moment object with the new date
 */
export function setTimeInSeconds( original, seconds = 0 ) {
	if ( ! ( original instanceof moment ) ) {
		throw new Error( 'Make sure your values are instances of moment' );
	}

	if ( seconds < 0 ) {
		return original;
	}

	return original
		.startOf( 'day' )
		.seconds( seconds || original.seconds() );
}

export function totalSeconds( date ) {
	return date.diff( moment().startOf( 'day' ), 'seconds' );
	return date.format( 'X' ) - moment( '00:00:00', FORMATS.TIME ).format( 'X' );
}