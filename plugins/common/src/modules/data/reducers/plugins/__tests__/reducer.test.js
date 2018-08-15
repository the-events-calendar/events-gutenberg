/**
 * Internal dependencies
 */
import reducer, { actions } from '@moderntribe/common/data/reducers/plugins';

describe( 'Plugins reducer', () => {
	it( 'Should return the default state', () => {
		expect( reducer( undefined, {} ) ).toEqual( {} );
	} );

	it( 'Should add a new plugin as inactive', () => {
		expect( reducer( {}, actions.addPlugin( 'events' ) ) ).toMatchSnapshot();
	} );

	it( 'Should deactivate a plugin', () => {
		expect( reducer( {}, actions.deactivatePlugin( 'events' ) ) ).toMatchSnapshot();
	} );

	it( 'Should activate the plugin', () => {
		expect( reducer( {}, actions.activatePlugin( 'events' ) ) ).toMatchSnapshot();
	} );

	it( 'Should remove the plugin from the reducer', () => {
		const state = reducer( {}, actions.addPlugin( 'events' ) );
		expect( reducer( state, actions.removePlugin( 'events' ) ) ).toMatchSnapshot();
	} );
} );
