/**
 * External Dependencies
 */
import * as options from '../options';

describe( 'Exception options', () => {
	const keys = Object.keys( options );

	keys.forEach( ( key ) => {
		test( key, () => {
			expect( options[ key ] ).toMatchSnapshot();
		} );
	} );
} );
