/**
 * Internal dependencies
 */
import { types } from '@moderntribe/events/data/blocks/organizers';

describe( '[STORE] - Organizers types', () => {
	it( 'Should return the organizers types', () => {
		expect( types.ADD_ORGANIZER_BLOCK ).toBe( 'ADD_ORGANIZER_BLOCK' );
		expect( types.REMOVE_ORGANIZER_BLOCK ).toBe( 'REMOVE_ORGANIZER_BLOCK' );
		expect( types.ADD_CLASSIC_ORGANIZERS ).toBe( 'ADD_CLASSIC_ORGANIZERS' );
		expect( types.SET_CLASSIC_ORGANIZERS ).toBe( 'SET_CLASSIC_ORGANIZERS' );
		expect( types.REMOVE_CLASSIC_ORGANIZERS ).toBe( 'REMOVE_CLASSIC_ORGANIZERS' );
	} );
} );
