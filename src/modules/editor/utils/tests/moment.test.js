/**
 * External dependencies
 */
import moment from 'moment/moment';

/**
 * Internal dependencies
 */
import * as m from './../moment';

import { HALF_HOUR_IN_SECONDS } from './../time';

const FORMAT = 'MM-DD-YYYY HH:mm:ss';

describe( 'Tests for moment.js', () => {
	test( 'roundTime', () => {
		const test1 = m.roundTime(
			moment( '05-09-2018 12:26:02', FORMAT ),
		);
		expect( test1 ).toBeInstanceOf( moment );
		expect( test1.hour() ).toEqual( 12 );
		expect( test1.minutes() ).toEqual( 0 );
		expect( test1.seconds() ).toEqual( 0 );

		const test2 = m.roundTime(
			moment( '05-09-2018 15:30:02', FORMAT ),
		);
		expect( test2 ).toBeInstanceOf( moment );
		expect( test2.hour() ).toEqual( 15 );
		expect( test2.minutes() ).toEqual( 30 );
		expect( test2.seconds() ).toEqual( 0 );

		const test3 = m.roundTime(
			moment( '05-09-2018 23:59:59', FORMAT ),
		);
		expect( test3 ).toBeInstanceOf( moment );
		expect( test3.hour() ).toEqual( 23 );
		expect( test3.minutes() ).toEqual( 30 );
		expect( test3.seconds() ).toEqual( 0 );

		const test4 = m.roundTime(
			moment( '05-09-2018 08:01:59', FORMAT ),
		);
		expect( test4 ).toBeInstanceOf( moment );
		expect( test4.hour() ).toEqual( 8 );
		expect( test4.minutes() ).toEqual( 0 );
		expect( test4.seconds() ).toEqual( 0 );
	} );

	test( 'toMoment', () => {
		const input = m.toMoment( new Date( 'January 2, 2015 08:01:59' ) );

		expect( input ).toBeInstanceOf( moment );
		expect( input.date() ).toEqual( 2 );
		expect( input.month() ).toEqual( 0 );
		expect( input.year() ).toEqual( 2015 );
		expect( input.hour() ).toEqual( 0 );
		expect( input.minutes() ).toEqual( 0 );
		expect( input.seconds() ).toEqual( 0 );
		expect( input.milliseconds() ).toEqual( 0 );
		expect( input.format( FORMAT ) ).toEqual( '01-02-2015 00:00:00' );
	} );

	test( 'replaceDate', () => {
		expect( () => m.replaceDate( 'Sample string', 123123 ) ).toThrowError();

		const a = moment( '02-28-2010 14:24:40', FORMAT );
		const b = moment( '05-10-2012 20:14:20', FORMAT );

		const replaced = m.replaceDate( a, b );
		expect( replaced ).toBeInstanceOf( moment );
		expect( replaced.date() ).toEqual( 10 );
		expect( replaced.month() ).toEqual( 4 );
		expect( replaced.year() ).toEqual( 2012 );
		expect( replaced.hour() ).toEqual( 14 );
		expect( replaced.minute() ).toEqual( 24 );
		expect( replaced.second() ).toEqual( 40 );
		expect( replaced.format( FORMAT ) ).toEqual( '05-10-2012 14:24:40' );
	} );

	test( 'setTimeInSeconds', () => {
		expect( () => m.setTimeInSeconds( 'Sample String', 123123 ) ).toThrowError();

		const a = moment( '02-28-2010 14:24:40', FORMAT );
		const SECONDS = ( 12.5 ) * 60 * 60;
		const replaced = m.setTimeInSeconds( a, SECONDS );
		expect( replaced ).toBeInstanceOf( moment );
		expect( replaced.date() ).toEqual( 28 );
		expect( replaced.month() ).toEqual( 1 );
		expect( replaced.year() ).toEqual( 2010 );
		expect( replaced.hour() ).toEqual( 12 );
		expect( replaced.minute() ).toEqual( 30 );
		expect( replaced.seconds() ).toEqual( 0 );
		expect( replaced.milliseconds() ).toEqual( 0 );

		const test2 = m.setTimeInSeconds( a, 0 );
		expect( test2.date() ).toEqual( 28 );
		expect( test2.month() ).toEqual( 1 );
		expect( test2.year() ).toEqual( 2010 );
		expect( test2.hour() ).toEqual( 0 );
		expect( test2.minute() ).toEqual( 0 );
		expect( test2.seconds() ).toEqual( 0 );
		expect( test2.milliseconds() ).toEqual( 0 );
	} );

	test( 'totalSeconds', () => {
		expect( m.totalSeconds( null ) ).toEqual( 0 );
		expect( m.totalSeconds( new Date() ) ).toEqual( 0 );
		expect( m.totalSeconds( moment().startOf( 'day' ) ) ).toEqual( 0 );
		expect( m.totalSeconds( moment( 'May 23, 2018 12:30 am', 'MMM D, YYYY k:m a' ) ) )
			.toEqual( HALF_HOUR_IN_SECONDS );
	} );

	test( 'toDateTime', () => {
		const converted = m.toDateTime( moment() );
		expect( typeof converted ).toBe( 'string' );
		expect( converted ).toBe( moment().format( 'MMMM D, YYYY h:m a' ) );
	} );

	test( 'toDate', () => {
		const converted = m.toDate( moment() );
		expect( typeof converted ).toBe( 'string' );
		expect( converted ).toBe( moment().format( 'MMMM D, YYYY' ) );
	} );

	test( 'toDateNoYear', () => {
		const converted = m.toDateNoYear( moment() );
		expect( typeof converted ).toBe( 'string' );
		expect( converted ).toBe( moment().format( 'MMMM D' ) );
	} );

	test( 'toTime', () => {
		const converted = m.toTime( moment() );
		expect( typeof converted ).toBe( 'string' );
		expect( converted ).toBe( moment().format( 'h:m a' ) );
	} );

	test( 'toDatePicker', () => {
		const converted = m.toDatePicker( moment() );
		expect( typeof converted ).toBe( 'string' );
		expect( converted ).toBe( moment().format( 'YYYY-MM-DDTHH:mm:ss' ) );
	} );

	test( 'isSameDay', () => {
		expect( m.isSameDay( moment(), moment().endOf( 'day' ) ) ).toBeTruthy();
		expect( m.isSameDay( moment().endOf( 'day' ), moment().endOf( 'day' ) ) ).toBeTruthy();
		expect( m.isSameDay( moment(), moment().add( 10, 'days' ) ) ).toBeFalsy();
		expect( m.isSameDay( new Date(), new Date() ) ).toBeTruthy();
	} );

	test( 'toMomentFromDate', () => {
		expect( () => m.toMomentFromDate( '' ) ).toThrowError();
		expect( () => m.toMomentFromDate( moment() ) ).toThrowError();
		const now = new Date();
		expect( m.toMomentFromDate( now ) ).toBeInstanceOf( moment );
		expect( m.toMomentFromDate( now ).isSame( moment().startOf( 'day' ) ) ).toBeTruthy();
	} );

	test( 'toFormat', () => {
		expect( m.toFormat( '' ) ).toEqual( '' );
		expect( m.toFormat( 'tLBIOPTZcr' ) ).toEqual( '' );
		expect( m.toFormat( 'd' ) ).toEqual( 'DD' );
		expect( m.toFormat( 'D' ) ).toEqual( 'ddd' );
		expect( m.toFormat( 'j' ) ).toEqual( 'D' );
		expect( m.toFormat( 'l' ) ).toEqual( 'dddd' );
		expect( m.toFormat( 'N' ) ).toEqual( 'E' );
		expect( m.toFormat( 'S' ) ).toEqual( 'o' );
		expect( m.toFormat( 'w' ) ).toEqual( 'e' );
		expect( m.toFormat( 'z' ) ).toEqual( 'DDD' );
		expect( m.toFormat( 'W' ) ).toEqual( 'W' );
		expect( m.toFormat( 'F' ) ).toEqual( 'MMMM' );
		expect( m.toFormat( 'm' ) ).toEqual( 'MM' );
		expect( m.toFormat( 'M' ) ).toEqual( 'MMM' );
		expect( m.toFormat( 'n' ) ).toEqual( 'M' );
		expect( m.toFormat( 'o' ) ).toEqual( 'YYYY' );
		expect( m.toFormat( 'Y' ) ).toEqual( 'YYYY' );
		expect( m.toFormat( 'y' ) ).toEqual( 'YY' );
		expect( m.toFormat( 'a' ) ).toEqual( 'a' );
		expect( m.toFormat( 'A' ) ).toEqual( 'A' );
		expect( m.toFormat( 'g' ) ).toEqual( 'h' );
		expect( m.toFormat( 'G' ) ).toEqual( 'H' );
		expect( m.toFormat( 'h' ) ).toEqual( 'hh' );
		expect( m.toFormat( 'H' ) ).toEqual( 'HH' );
		expect( m.toFormat( 'i' ) ).toEqual( 'mm' );
		expect( m.toFormat( 's' ) ).toEqual( 'ss' );
		expect( m.toFormat( 'u' ) ).toEqual( 'SSS' );
		expect( m.toFormat( 'e' ) ).toEqual( 'zz' );
		expect( m.toFormat( 'U' ) ).toEqual( 'X' );
	} );
} );
