/**
 * Internal dependencies
 */
import { types } from '@@tribe/events/data/blocks/website';

describe( '[STORE] - Website types', () => {
	it( 'Should match the types values', () => {
		expect( types.SET_WEBSITE_URL ).toBe( 'SET_WEBSITE_URL' );
		expect( types.SET_WEBSITE_LABEL ).toBe( 'SET_WEBSITE_LABEL' );
	} );
} );
