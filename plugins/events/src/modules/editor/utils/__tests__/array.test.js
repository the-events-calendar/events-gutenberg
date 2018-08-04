/**
 * Internal dependencies
 */
import { hasAnyOf } from '@@tribe/events/editor/utils/array';

describe( 'Tests for array.js', () => {
	test( 'hasAnyOf', () => {
		expect( hasAnyOf( [] ) ).toEqual( false );
		expect( hasAnyOf( [], 1 ) ).toEqual( false );
		expect( hasAnyOf( [ 1, 2, 3 ], 5 ) ).toEqual( false );
		expect( hasAnyOf( [ 1, 2, 3 ], 2 ) ).toEqual( true );
	} );
} );
