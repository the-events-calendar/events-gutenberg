/**
 * Internal dependencies
 */
import { types } from '@moderntribe/events/data/details';

describe( '[STORE] - Details types', () => {
	it( 'Should return the types values', () => {
		expect( types.SET_DETAILS_POST_TYPE ).toBe( 'SET_DETAILS_POST_TYPE' );
		expect( types.SET_DETAILS_LOADING ).toBe( 'SET_DETAILS_LOADING' );
		expect( types.SET_DETAILS ).toBe( 'SET_DETAILS' );
	} );
} );
