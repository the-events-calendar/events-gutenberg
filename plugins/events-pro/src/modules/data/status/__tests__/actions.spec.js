/**
 * External Dependencies
 */
import * as actions from '../actions';

describe( 'Status actions', () => {
	const keys = Object.keys( actions );

	keys.forEach( ( key ) => {
		test( key, () => {
			expect( actions[ key ]( {} ) ).toMatchSnapshot();
		} );
	} );
} );
