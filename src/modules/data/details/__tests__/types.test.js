/**
 * Internal dependencies
 */
import { types } from 'data/details';

describe( '[STORE] - Details types', () => {
	it( 'Should return the types values', () => {
		expect( types.SET_POST_TYPE ).toBe( 'SET_POST_TYPE' );
		expect( types.SET_IS_LOADING ).toBe( 'SET_IS_LOADING' );
		expect( types.SET_DETAILS ).toBe( 'SET_DETAILS' );
	} );
} );
