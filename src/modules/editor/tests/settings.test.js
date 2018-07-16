/**
 * Internal dependencies
 */
import settings, { getSettings, getSetting, hasSetting } from '../settings';

describe( 'Tests for settings.js', () => {
	test( 'It should return an object as the settings', () => {
		expect( getSettings() ).toEqual( {} );
	} );

	test( 'It should return the default', () => {
		const spy = jest.spyOn( settings, 'getSettings' );
		spy.mockReturnValue( {
			api: 'lorem',
			map: false,
		} );

		expect( getSetting( 'api' ) ).toEqual( 'lorem' );
		expect( getSetting( 'map', true ) ).toEqual( false );
		expect( getSetting( 'value', null ) ).toBeNull();
		expect( getSetting( 'value' ) ).toBeUndefined();

		expect( hasSetting( 'api' ) ).toEqual( true );
		expect( hasSetting( 'tribe' ) ).toEqual( false );
		expect( spy ).toHaveBeenCalled();

		spy.mockReset();
		spy.mockRestore();
	} );
} );
