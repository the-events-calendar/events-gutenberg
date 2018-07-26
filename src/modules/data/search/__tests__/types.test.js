/**
 * Internal dependencies
 */
import { types } from 'data/search';

describe( '[STORE] - Search types', () => {
	it( 'Should return the types values', () => {
		expect( types.SET_POST_TYPE ).toBe( 'SET_POST_TYPE' );
		expect( types.ADD_BLOCK ).toBe( 'ADD_BLOCK' );
		expect( types.CLEAR_BLOCK ).toBe( 'CLEAR_BLOCK' );
		expect( types.SET_SEARCH_LOADING ).toBe( 'SET_SEARCH_LOADING' );
		expect( types.SET_PAGE ).toBe( 'SET_PAGE' );
		expect( types.SET_TOTAL_PAGES ).toBe( 'SET_TOTAL_PAGES' );
		expect( types.ADD_RESULTS ).toBe( 'ADD_RESULTS' );
		expect( types.SET_RESULTS ).toBe( 'SET_RESULTS' );
		expect( types.SET_TERM ).toBe( 'SET_TERM' );
		expect( types.SEARCH ).toBe( 'SEARCH' );
	} );
} );
