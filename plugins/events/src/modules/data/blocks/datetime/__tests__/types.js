/**
 * Internal dependencies
 */
import { types } from '@moderntribe/events/data/blocks/datetime';

describe( '[STORE] - Datetime types', () => {
	it( 'Should return the types values', () => {
		expect( types.SET_END_DATE_TIME ).toBe( 'SET_END_DATE_TIME' );
		expect( types.SET_START_DATE_TIME ).toBe( 'SET_START_DATE_TIME' );
		expect( types.SET_ALL_DAY ).toBe( 'SET_ALL_DAY' );
		expect( types.SET_TIME_ZONE ).toBe( 'SET_TIME_ZONE' );
		expect( types.SET_MULTI_DAY ).toBe( 'SET_MULTI_DAY' );
		expect( types.SET_SEPARATOR_TIME ).toBe( 'SET_SEPARATOR_TIME' );
		expect( types.SET_SEPARATOR_DATE ).toBe( 'SET_SEPARATOR_DATE' );
		expect( types.SET_TIMEZONE_LABEL ).toBe( 'SET_TIMEZONE_LABEL' );
		expect( types.SET_TIMEZONE_VISIBILITY ).toBe( 'SET_TIMEZONE_VISIBILITY' );
		expect( types.SET_NATURAL_LANGUAGE_LABEL ).toBe( 'SET_NATURAL_LANGUAGE_LABEL' );
	} );
} );
