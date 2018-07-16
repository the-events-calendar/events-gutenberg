/**
 * Internal dependencies
 */
import {
	global,
	google,
	mapsAPI,
	settings,
	list,
} from '../globals';

describe( 'Tests for globals.js', () => {
	test( 'Should match the default value for the globals values', () => {
		expect( global ).toEqual( window );
		expect( google ).toEqual( null );
		expect( settings ).toEqual( {} );
		expect( mapsAPI ).toEqual( {} );
		expect( list ).toEqual( {
			countries: {},
			us_states: {},
		} );
	} );
} );
