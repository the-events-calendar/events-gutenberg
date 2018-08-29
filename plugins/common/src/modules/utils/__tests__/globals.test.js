/**
 * Internal dependencies
 */
import {
	google,
	mapsAPI,
	settings,
	list,
	get,
	config,
} from '@moderntribe/common/utils/globals';

describe( 'Tests for globals.js', () => {

	beforeAll( () => {
		window.tribe_blocks_editor_google_maps_api = {};
		window.tribe_blocks_editor_settings = {};
		window.tribe_data_countries = {};
		window.tribe_data_us_states = {};
		window.tribe_js_config = {};
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
		expect( config() ).toEqual( {} );
	} );

	test( 'get default value', () => {
		expect( get( 'UNKNOWN', 10 ) ).toBe( 10 );
		expect( get( 'tribe_js_config', [] ) ).toEqual( {} );
	} );

	afterAll( () => {
		delete window.tribe_blocks_editor_google_maps_api;
		delete window.tribe_blocks_editor_settings;
		delete window.tribe_data_countries;
		delete window.tribe_data_us_states;
		delete window.tribe_js_config;
	});
} );
