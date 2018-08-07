/**
 * Internal dependencies
 */
import { types } from '@moderntribe/events/data/blocks/sharing';

describe( '[STORE] - Sharing types', () => {
	it( 'Should return the value for the types', () => {
		expect( types.SET_HAS_GOOGLE_CALENDAR ).toBe( 'SET_HAS_GOOGLE_CALENDAR' );
		expect( types.SET_GOOGLE_CALENDAR_LABEL ).toBe( 'SET_GOOGLE_CALENDAR_LABEL' );
		expect( types.TOGGLE_GOOGLE_CALENDAR ).toBe( 'TOGGLE_GOOGLE_CALENDAR' );
		expect( types.SET_HAS_ICAL ).toBe( 'SET_HAS_ICAL' );
		expect( types.TOGGLE_ICAL ).toBe( 'TOGGLE_ICAL' );
		expect( types.SET_ICAL_LABEL ).toBe( 'SET_ICAL_LABEL' );
	} );
} );
