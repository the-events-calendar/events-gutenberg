/**
 * Internal dependencies
 */
import { types } from '@moderntribe/events/data/request';

describe( '[STORE] - Request types', () => {
	it( 'Should return the types values', () => {
		expect( types.WP_REQUEST ).toBe( 'WP_REQUEST' );
	} );
} );
