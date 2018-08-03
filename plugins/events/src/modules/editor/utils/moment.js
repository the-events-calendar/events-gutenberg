/**
 * External dependencies
 */
import { isString } from 'lodash';
import moment from 'moment/moment';
import { FORMATS } from './date';
import { replaceWithObject } from './string';

/**
 * Make sure the format provided matches the spec used by moment.js
 *
 * @param {string} format The format to be converted to a moment format
 * @returns {string} return a moment.js valid format
 */
export function toFormat( format ) {
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

	return replaceWithObject( format, replacements );
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
		.clone()
		.subtract( minutes, 'm' )
		.seconds( 0 );
}

/**
 * Parse multiple formats in a date to ensure the generated dates are valid
 *
 * @param {string} date The date to be converted
 * @param {array} formats The list of formats used to format
 * @returns {moment} moment Object with the date or current date if is non valid
 */
export function parseFormats( date, formats = [ FORMATS.DATABASE.datetime, FORMATS.WP.datetime ] ) {
	for ( let i = 0; i < formats.length; i++ ) {
		const format = formats[ i ];
		const result = toMoment( date, format );
		if ( result.isValid() ) {
			return result;
		}
	}

	const noFormat = moment( date );
	return noFormat.isValid() ? noFormat : moment();
}

/**
 * Convert a Date() object into a Moment.js object avoiding warnings of different formats
 * used by Date
 *
 * @param {(Date|moment|string)} date The date to be converted.
 * @param {string} format The format of the data to be used
 * @returns {moment} A moment object
 */
export function toMoment( date, format = FORMATS.DATABASE.datetime ) {
	if ( date instanceof moment ) {
		return moment( date );
	} else if ( date instanceof Date ) {
		return toMomentFromDate( date );
	} else if ( isString( date ) ) {
		return moment( date, toFormat( format ) );
	}

	return moment();
}

export function toMomentFromDate( date ) {
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

/**
 * Total seconds of a current date from moment
 *
 * @param {moment} date The date to compare on the current day
 * @returns {int} Total of seconds from start of the day to the current moment,
 */
export function totalSeconds( date ) {
	if ( ! date || ! ( date instanceof moment ) ) {
		return 0;
	}

	return date.diff( moment( date ).startOf( 'day' ), 'seconds' );
}

/**
 * Convert a moment object into a WP date time format
 *
 * @param {moment} date A moment date object
 * @param {string} format Format used to output the date
 * @returns {string} A date time format
 */
export function toDateTime( date, format = FORMATS.DATABASE.datetime ) {
	return date.format( toFormat( format ) );
}

export function toDate( date, format = FORMATS.WP.date ) {
	return date.format( toFormat( format ) );
}

export function toDateNoYear( date, format = FORMATS.WP.dateNoYear ) {
	return date.format( toFormat( format ) );
}

export function toTime( date, format = FORMATS.WP.time ) {
	return date.format( toFormat( format ) );
}

export function toDatePicker( date = moment(), format = 'YYYY-MM-DDTHH:mm:ss' ) {
	return date.format( format );
}

/**
 * Test if the current start and end date are happening on the same day.
 *
 * @param {moment} start The start of the event
 * @param {(moment|String)} end The end date of the event
 * @returns {boolean} if the event is happening on the same day
 */
export function isSameDay( start, end ) {
	return moment( start ).isSame( end, 'day' );
}
