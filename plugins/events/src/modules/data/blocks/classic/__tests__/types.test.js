/**
 * Internal dependencies
 */
import { types } from '@moderntribe/events/data/blocks/classic';

describe( '[STORE] - Classic types', () => {
	it( 'Should return the types values', () => {
		expect( types.SET_CLASSIC_ORGANIZERS_TITLE ).toBe( 'SET_CLASSIC_ORGANIZERS_TITLE' );
		expect( types.SET_CLASSIC_DETAILS_TITLE ).toBe( 'SET_CLASSIC_DETAILS_TITLE' );
	} );
} );
