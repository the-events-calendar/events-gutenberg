/**
 * Internal dependencies
 */
import { types } from 'data/blocks/venue';

describe( '[STORE] - Venue types', () => {
	it( 'Should return the venue types', () => {
		expect( types.SET_VENUE ).toEqual( 'SET_VENUE' );
		expect( types.SET_VENUE_MAP_LINK ).toEqual( 'SET_VENUE_MAP_LINK' );
		expect( types.SET_VENUE_MAP ).toEqual( 'SET_VENUE_MAP' );
		expect( types.TOGGLE_VENUE_MAP ).toEqual( 'TOGGLE_VENUE_MAP' );
		expect( types.TOGGLE_VENUE_MAP_LINK ).toEqual( 'TOGGLE_VENUE_MAP_LINK' );
	} );
} );
