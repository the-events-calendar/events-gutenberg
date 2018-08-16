/**
 * Internal dependencies
 */
import reducer, { actions } from '@moderntribe/common/data/reducers/plugins';

describe( 'Plugins reducer', () => {
	it( 'Should return the default state', () => {
		expect( reducer( undefined, {} ) ).toEqual( {} );
	} );

	it( 'Should add a new plugin as active', () => {
		expect( reducer( {}, actions.addPlugin( 'events' ) ) ).toMatchSnapshot();
	} );

	it( 'Should remove the plugin from the reducer', () => {
		const state = reducer( {}, actions.addPlugin( 'events' ) );
		expect( reducer( state, actions.removePlugin( 'events' ) ) ).toMatchSnapshot();
	} );
} );
