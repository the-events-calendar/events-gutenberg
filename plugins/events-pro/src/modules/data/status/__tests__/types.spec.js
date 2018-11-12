/**
 * External Dependencies
 */
import * as types from '../types';

describe( 'Status types', () => {
	const keys = Object.keys( types );

	keys.forEach( ( key ) => {
		test( key, () => {
			expect( types[ key ] ).toMatchSnapshot();
		} );
	} );
} );
