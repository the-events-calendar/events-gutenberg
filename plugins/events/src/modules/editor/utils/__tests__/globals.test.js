/**
 * Internal dependencies
 */
import {
	google,
	mapsAPI,
	settings,
	list,
	get,
} from '@@tribe/events/editor/utils/globals';

describe( 'Tests for globals.js', () => {

	beforeAll( () => {
		window.tribe_blocks_editor_google_maps_api = {};
		window.tribe_blocks_editor_settings = {};
		window.tribe_data_countries = {};
		window.tribe_data_us_states = {};
	} );

	test( 'Should match the default value for the globals values', () => {
		expect( get( 'random' ) ).toBe( undefined );
		expect( get( 'google' ) ).toBe( undefined );
		expect( google() ).toBe( undefined );
		expect( get( 'tribe_blocks_editor_settings' ) ).toEqual( {} );
		expect( settings() ).toEqual( {} );
		expect( mapsAPI() ).toEqual( {} );
		expect( list() ).toEqual( {
			countries: {},
			us_states: {},
		} );
	} );

	afterAll( () => {
		delete window.tribe_blocks_editor_google_maps_api;
		delete window.tribe_blocks_editor_settings;
		delete window.tribe_data_countries;
		delete window.tribe_data_us_states;
	});
} );
