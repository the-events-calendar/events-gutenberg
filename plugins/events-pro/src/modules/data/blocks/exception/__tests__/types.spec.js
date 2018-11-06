/**
 * Internal Dependencies
 */
import * as types from '../types';

describe( 'Exception Types', () => {
	const keys = Object.keys( types );

	keys.forEach( ( key ) => {
		test( key, () => {
			expect( types[ key ] ).toMatchSnapshot();
		} );
	} );
} );
