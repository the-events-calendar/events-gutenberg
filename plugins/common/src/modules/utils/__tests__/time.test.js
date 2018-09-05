/**
 * Internal dependencies
 */
import { time } from '@moderntribe/common/utils';

describe( 'Tests for time.js', () => {
	test( 'MINUTE_IN_SECONDS', () => {
		expect( time.MINUTE_IN_SECONDS ).toEqual( 60 );
	} );

	test( 'HALF_HOUR_IN_SECONDS', () => {
		expect( time.HALF_HOUR_IN_SECONDS ).toEqual( 1800 );
	} );

	test( 'HOUR_IN_SECONDS', () => {
		expect( time.HOUR_IN_SECONDS ).toEqual( 3600 );
	} );

	test( 'DAY_IN_SECONDS', () => {
		expect( time.DAY_IN_SECONDS ).toEqual( 86400 );
	} );

	test( 'START_OF_DAY', () => {
		expect( time.START_OF_DAY ).toEqual( '00:00' );
	} );

	test( 'END_OF_DAY', () => {
		expect( time.END_OF_DAY ).toEqual( '23:59' );
	} );

	test( 'TIME_FORMAT_HH_MM_SS_SSS', () => {
		expect( time.TIME_FORMAT_HH_MM_SS_SSS ).toEqual( 'hh:mm:ss.sss' );
	} );

	test( 'TIME_FORMAT_HH_MM_SS', () => {
		expect( time.TIME_FORMAT_HH_MM_SS ).toEqual( 'hh:mm:ss' );
	} );

	test( 'TIME_FORMAT_HH_MM', () => {
		expect( time.TIME_FORMAT_HH_MM ).toEqual( 'hh:mm' );
	} );

	test( 'TIME_FORMAT_MM_SS_SSS', () => {
		expect( time.TIME_FORMAT_MM_SS_SSS ).toEqual( 'mm:ss.sss' );
	} );

	test( 'TIME_FORMAT_MM_SS', () => {
		expect( time.TIME_FORMAT_MM_SS ).toEqual( 'mm:ss' );
	} );

	test( 'HOUR_IN_MS', () => {
		expect( time.HOUR_IN_MS ).toEqual( 3600000 );
	} );

	test( 'MINUTE_IN_MS', () => {
		expect( time.MINUTE_IN_MS ).toEqual( 60000 );
	} );

	test( 'SECOND_IN_MS', () => {
		expect( time.SECOND_IN_MS ).toEqual( 1000 );
	} );

	/**
	 * Below are tests copied from the hh-mm-ss library and adjusted to use
	 * Jest instead of Tape for testing.
	 * Link: https://github.com/Goldob/hh-mm-ss/blob/master/test/index.js
	 */
	test( 'fromMs() test', () => {
		// Basic functionality
		expect( time.fromMs( 75000 ) ).toEqual( '01:15' );
		expect( time.fromMs( 442800000 ) ).toEqual( '123:00:00' );
		expect( time.fromMs( 90576 ) ).toEqual( '01:30.576' );
		expect( time.fromMs( -157250 ) ).toEqual( '-02:37.250' );

		// Output formatting
		expect( time.fromMs( 38000, 'mm:ss.sss' ) ).toEqual( '00:38.000' );
		expect( time.fromMs( 0, 'hh:mm:ss' ) ).toEqual( '00:00:00' );
		expect( time.fromMs( 3600000, 'mm:ss' ) ).toEqual( '01:00:00' );
		expect( time.fromMs( 4500000, 'hh:mm' ) ).toEqual( '01:15' );
		expect( time.fromMs( -9900000, 'hh:mm' ) ).toEqual( '-02:45' );

		// Input validation
		expect( () => time.fromMs( null ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.fromMs('text') ).toThrowErrorMatchingSnapshot();
		expect( () => time.fromMs(0, 'mm:hh:ss') ).toThrowErrorMatchingSnapshot();
	} );

	test( 'fromS() test', () => {
		// Basic functionality
		expect( time.fromS( 75 ) ).toEqual( '01:15' );
		expect( time.fromS( 442800 ) ).toEqual( '123:00:00' );
		expect( time.fromS( -442800 ) ).toEqual( '-123:00:00' );

		// Output formatting
		expect( time.fromS( 38, 'mm:ss.sss' ) ).toEqual( '00:38.000' );
		expect( time.fromS( 0, 'hh:mm:ss' ) ).toEqual( '00:00:00' );
		expect( time.fromS( 3600, 'mm:ss' ) ).toEqual( '01:00:00' );
		expect( time.fromS( 4500, 'hh:mm' ) ).toEqual( '01:15' );
		expect( time.fromS( -9900, 'hh:mm' ) ).toEqual( '-02:45' );

		// Input validation
		expect( () => time.fromS( null ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.fromS( 'text' ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.fromS( 0, 'mm:hh:ss' ) ).toThrowErrorMatchingSnapshot();
	} );

	test( 'toMs() test', () => {
		// Basic functionality
		expect( time.toMs( '01:05:17' ) ).toEqual( 3917000 );
		expect( time.toMs( '137:00:00.0' ) ).toEqual( 493200000 );
		expect( time.toMs( '00:10.230' ) ).toEqual( 10230 );
		expect( time.toMs( '00:00:07.10845' ) ).toEqual( 7108 );
		expect( time.toMs( '-02:07:12' ) ).toEqual( -7632000 );
		expect( time.toMs( '02:00' ) ).toEqual( 120000 );
		expect( time.toMs( '02:00', 'hh:mm' ) ).toEqual( 7200000 );
		expect( time.toMs( '-04:35', 'hh:mm' ) ).toEqual( -16500000 );
		expect( time.toMs( '00:00:07.10845', 'hh:mm' ) ).toEqual( 7108 );

		// Input validation
		expect( () => time.toMs( '13:05:02:11' ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.toMs( '153' ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.toMs( null ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.toMs( '00:62' ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.toMs( '01:30', 'mm:hh:ss' ) ).toThrowErrorMatchingSnapshot();
	} );

	test( 'toS() test', () => {
		// Basic functionality
		expect( time.toS( '01:05:17' ) ).toEqual( 3917 );
		expect( time.toS( '137:00:00.0' ) ).toEqual( 493200 );
		expect( time.toS( '00:10.230' ) ).toEqual( 10 );
		expect( time.toS( '00:00:07.10845' ) ).toEqual( 7 );
		expect( time.toS( '-02:07:12' ) ).toEqual( -7632 );
		expect( time.toS( '02:00' ) ).toEqual( 120 );
		expect( time.toS( '02:00', 'hh:mm' ) ).toEqual( 7200 );
		expect( time.toS( '-04:35', 'hh:mm' ) ).toEqual( -16500 );
		expect( time.toS( '00:00:07.10845', 'hh:mm' ) ).toEqual( 7 );

		// Input validation
		expect( () => time.toS( '13:05:02:11' ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.toS( '153' ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.toS( null ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.toS( '00:62' ) ).toThrowErrorMatchingSnapshot();
		expect( () => time.toS( '01:30', 'mm:hh:ss' ) ).toThrowErrorMatchingSnapshot();
	} );

	test( 'symmetrical conversion test', () => {
		/*
		 * fromMs() and toMs() for all formats
		 */

		// 90000ms = 1m 30s
		expect( time.toMs( time.fromMs( 90000, 'mm:ss' ), 'mm:ss' ) ).toEqual( 90000 );
		expect( time.toMs( time.fromMs( 90000, 'mm:ss.sss' ), 'mm:ss.sss' ) ).toEqual( 90000 );
		expect( time.toMs( time.fromMs( 90000, 'hh:mm' ), 'hh:mm' ) ).toEqual( 90000 );
		expect( time.toMs( time.fromMs( 90000, 'hh:mm:ss' ), 'hh:mm:ss' ) ).toEqual( 90000 );
		expect( time.toMs( time.fromMs( 90000, 'hh:mm:ss.sss' ), 'hh:mm:ss.sss' ) ).toEqual( 90000 );

		// 7517245ms = 2h 5m 17.245s
		expect( time.toMs( time.fromMs( 7517245, 'mm:ss' ), 'mm:ss' ) ).toEqual( 7517245 );
		expect( time.toMs( time.fromMs( 7517245, 'mm:ss.sss' ), 'mm:ss.sss' ) ).toEqual( 7517245 );
		expect( time.toMs( time.fromMs( 7517245, 'hh:mm' ), 'hh:mm' ) ).toEqual( 7517245 );
		expect( time.toMs( time.fromMs( 7517245, 'hh:mm:ss' ), 'hh:mm:ss' ) ).toEqual( 7517245 );
		expect( time.toMs( time.fromMs( 7517245, 'hh:mm:ss.sss' ), 'hh:mm:ss.sss' ) ).toEqual( 7517245 );

		// -10800000ms = -3h
		expect( time.toMs( time.fromMs( -10800000, 'mm:ss' ), 'mm:ss' ) ).toEqual( -10800000 );
		expect( time.toMs( time.fromMs( -10800000, 'mm:ss.sss' ), 'mm:ss.sss' ) ).toEqual( -10800000 );
		expect( time.toMs( time.fromMs( -10800000, 'hh:mm' ), 'hh:mm' ) ).toEqual( -10800000 );
		expect( time.toMs( time.fromMs( -10800000, 'hh:mm:ss' ), 'hh:mm:ss' ) ).toEqual( -10800000 );
		expect( time.toMs( time.fromMs( -10800000, 'hh:mm:ss.sss' ), 'hh:mm:ss.sss' ) ).toEqual( -10800000 );

		/*
		 * fromS() and toMs() for all formats
		 */

		// 930s = 15m 30s
		expect( time.toS( time.fromS( 930, 'mm:ss' ), 'mm:ss') ).toEqual( 930 );
		expect( time.toS( time.fromS( 930, 'mm:ss.sss' ), 'mm:ss.sss') ).toEqual( 930 );
		expect( time.toS( time.fromS( 930, 'hh:mm' ), 'hh:mm') ).toEqual( 930 );
		expect( time.toS( time.fromS( 930, 'hh:mm:ss' ), 'hh:mm:ss') ).toEqual( 930 );
		expect( time.toS( time.fromS( 930, 'hh:mm:ss.sss' ), 'hh:mm:ss.sss') ).toEqual( 930 );

		// 4850s = 1h 20m 50s
		expect( time.toS( time.fromS( 4850, 'mm:ss' ), 'mm:ss') ).toEqual( 4850 );
		expect( time.toS( time.fromS( 4850, 'mm:ss.sss' ), 'mm:ss.sss') ).toEqual( 4850 );
		expect( time.toS( time.fromS( 4850, 'hh:mm' ), 'hh:mm') ).toEqual( 4850 );
		expect( time.toS( time.fromS( 4850, 'hh:mm:ss' ), 'hh:mm:ss') ).toEqual( 4850 );
		expect( time.toS( time.fromS( 4850, 'hh:mm:ss.sss' ), 'hh:mm:ss.sss') ).toEqual( 4850 );

		// -300s = -5m
		expect( time.toS( time.fromS( -300, 'mm:ss' ), 'mm:ss') ).toEqual( -300 );
		expect( time.toS( time.fromS( -300, 'mm:ss.sss' ), 'mm:ss.sss') ).toEqual( -300 );
		expect( time.toS( time.fromS( -300, 'hh:mm' ), 'hh:mm') ).toEqual( -300 );
		expect( time.toS( time.fromS( -300, 'hh:mm:ss' ), 'hh:mm:ss') ).toEqual( -300 );
		expect( time.toS( time.fromS( -300, 'hh:mm:ss.sss' ), 'hh:mm:ss.sss') ).toEqual( -300 );
	} );
} );
