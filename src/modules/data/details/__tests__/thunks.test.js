/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import { thunks } from 'data/details';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - Details thunks', () => {
	it( 'Should avoid fetching new details when loading', () => {
		const store = mockStore( {
			details: {
				20: {
					loading: true,
					details: {},
				},
			}
		} );
		store.dispatch( thunks.fetchDetails( 20 ) );
		expect( store.getActions() ).toEqual( [] );
	} );

	it( 'Should fetching details for non loading block', () => {
		const store = mockStore( {
			details: {
				20: {
					loading: false,
					details: {},
				},
			}
		} );
		store.dispatch( thunks.fetchDetails( 20 ) );
		expect( store.getActions() ).toMatchSnapshot();
	} );
} );
