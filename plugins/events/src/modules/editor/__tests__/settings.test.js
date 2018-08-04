/**
 * Internal dependencies
 */
import { getSettings, getSetting, hasSetting } from '@@plugins/events/editor/settings';

describe( 'Tests for settings.js', () => {
	beforeAll( () => {
		window.tribe_blocks_editor_settings = {
			api: 'lorem',
			map: false,
		};
	} );

	test( 'It should return an object as the settings', () => {
		const expected = {
			api: 'lorem',
			map: false,
		};
		expect( getSettings() ).toEqual( expected );
	} );

	test( 'It should return the default', () => {
		expect( getSetting( 'api' ) ).toEqual( 'lorem' );
		expect( getSetting( 'map', true ) ).toEqual( false );
		expect( getSetting( 'value', null ) ).toBeNull();
		expect( getSetting( 'value' ) ).toBeUndefined();

		expect( hasSetting( 'api' ) ).toEqual( true );
		expect( hasSetting( 'tribe' ) ).toEqual( false );
	} );

	afterAll( () => {
		delete window.tribe_blocks_editor_settings;
	} );
} );
