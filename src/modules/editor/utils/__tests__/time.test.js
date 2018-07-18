/**
 * Internal dependencies
 */
import {
	MINUTE_IN_SECONDS,
	HALF_HOUR_IN_SECONDS,
	HOUR_IN_SECONDS,
	DAY_IN_SECONDS,
} from 'utils/time';

describe( 'Tests for time.js', () => {
	test( 'MINUTE_IN_SECONDS', () => {
		expect( MINUTE_IN_SECONDS ).toEqual( 60 );
	} );

	test( 'HALF_HOUR_IN_SECONDS', () => {
		expect( HALF_HOUR_IN_SECONDS ).toEqual( 1800 );
	} );

	test( 'HOUR_IN_SECONDS', () => {
		expect( HOUR_IN_SECONDS ).toEqual( 3600 );
	} );

	test( 'DAY_IN_SECONDS', () => {
		expect( DAY_IN_SECONDS ).toEqual( 86400 );
	} );
} );
