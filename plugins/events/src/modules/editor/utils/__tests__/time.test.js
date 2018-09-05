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
} );
