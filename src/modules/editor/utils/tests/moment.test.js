/**
 * External dependencies
 */
import moment from 'moment/moment';

/**
 * Internal dependencies
 */
import { replaceDate, setTimeInSeconds, roundTime, toMoment, totalSeconds } from './../moment';
import { DAY_IN_SECONDS, HOUR_IN_SECONDS } from './../time';

test( 'normalize', () => {
	const FORMAT = 'MM-DD-YYYY HH:mm:ss';
	const test1 = roundTime(
		moment( '05-09-2018 12:26:02', FORMAT )
	);
	expect( test1 ).toBeInstanceOf( moment );
	expect( test1.hour() ).toEqual( 12 );
	expect( test1.minutes() ).toEqual( 0 );
	expect( test1.seconds() ).toEqual( 0 );

	const test2 = roundTime(
		moment( '05-09-2018 15:30:02', FORMAT )
	);
	expect( test2 ).toBeInstanceOf( moment );
	expect( test2.hour() ).toEqual( 15 );
	expect( test2.minutes() ).toEqual( 30 );
	expect( test2.seconds() ).toEqual( 0 );

	const test3 = roundTime(
		moment( '05-09-2018 23:59:59', FORMAT )
	);
	expect( test3 ).toBeInstanceOf( moment );
	expect( test3.hour() ).toEqual( 23 );
	expect( test3.minutes() ).toEqual( 30 );
	expect( test3.seconds() ).toEqual( 0 );

	const test4 = roundTime(
		moment( '05-09-2018 08:01:59', FORMAT )
	);
	expect( test4 ).toBeInstanceOf( moment );
	expect( test4.hour() ).toEqual( 8 );
	expect( test4.minutes() ).toEqual( 0 );
	expect( test4.seconds() ).toEqual( 0 );
} );

test( 'toMoment', () => {
	const input = toMoment( new Date( 'January 2, 2015 08:01:59' ) );
	const FORMAT = 'MM-DD-YYYY HH:mm:ss';

	expect( () => toMoment( 'Sample string' ) ).toThrowError();
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
	expect( () => replaceDate( 'Sample string', 123123 ) ).toThrowError();

	const FORMAT = 'MM-DD-YYYY HH:mm:ss';
	const a = moment( '02-28-2010 14:24:40', FORMAT );
	const b = moment( '05-10-2012 20:14:20', FORMAT );

	const replaced = replaceDate( a, b );
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
	expect( () => setTimeInSeconds( 'Sample String', 123123 ) ).toThrowError();

	const FORMAT = 'MM-DD-YYYY HH:mm:ss';
	const a = moment( '02-28-2010 14:24:40', FORMAT );
	const SECONDS = ( 12.5 ) * 60 * 60;
	const replaced = setTimeInSeconds( a, SECONDS );
	expect( replaced ).toBeInstanceOf( moment );
	expect( replaced.date() ).toEqual( 28 );
	expect( replaced.month() ).toEqual( 1 );
	expect( replaced.year() ).toEqual( 2010 );
	expect( replaced.hour() ).toEqual( 12 );
	expect( replaced.minute() ).toEqual( 30 );
	expect( replaced.seconds() ).toEqual( 0 );
	expect( replaced.milliseconds() ).toEqual( 0 );

	const test2 = setTimeInSeconds( a, 0 );
	expect( test2.date() ).toEqual( 28 );
	expect( test2.month() ).toEqual( 1 );
	expect( test2.year() ).toEqual( 2010 );
	expect( test2.hour() ).toEqual( 0 );
	expect( test2.minute() ).toEqual( 0 );
	expect( test2.seconds() ).toEqual( 0 );
	expect( test2.milliseconds() ).toEqual( 0 );
} );

test( 'totalSeconds', () => {
	expect( totalSeconds( null ) ).toEqual( 0 );
	expect( totalSeconds( new Date() ) ).toEqual( 0 );
	expect( totalSeconds( moment().startOf('day') ) ).toEqual( 0 );
} );