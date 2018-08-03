/**
 * Internal dependencies
 */
import { types } from 'data/blocks/price';

describe( '[STORE] - Price types', () => {
	it( 'Should return the types values', () => {
		expect( types.SET_PRICE_DESCRIPTION ).toBe( 'SET_PRICE_DESCRIPTION' );
		expect( types.SET_PRICE_POSITION ).toBe( 'SET_PRICE_POSITION' );
		expect( types.SET_PRICE_SYMBOL ).toBe( 'SET_PRICE_SYMBOL' );
		expect( types.SET_PRICE_COST ).toBe( 'SET_PRICE_COST' );
	} );
} );
