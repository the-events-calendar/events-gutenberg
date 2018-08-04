/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import { actions } from '@@tribe/events/data/blocks/website';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - Website actions', () => {
	it( 'Should set the website URL', () => {
		expect( actions.setWebsite( 'https://tri.be/' ) ).toMatchSnapshot();
	} );

	it( 'Should set the website label', () => {
		expect( actions.setLabel( 'Modern Tribe' ) ).toMatchSnapshot();
	} );
} );

describe( '[STORE] - Website thunk actions', () => {
	it( 'Should set the initial state', () => {
		const store = mockStore( {} );

		const get = jest.fn( ( key ) => {
			const values = {
				url: 'https://tri.be/',
				urlLabel: 'Modern Tribe',
			};
			return values[ key ];
		} );

		store.dispatch( actions.setInitialState( { get } ) );

		expect( get ).toHaveBeenCalled();
		expect( get ).toHaveBeenCalledTimes( 2 );
		expect( store.getActions() ).toMatchSnapshot();
	} );
} );
