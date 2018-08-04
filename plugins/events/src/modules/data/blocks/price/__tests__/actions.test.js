/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
/**
 * Internal dependencies
 */
import { actions } from '@@plugins/events/data/blocks/price';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - Price actions', () => {
	it( 'Should set the cost', () => {
		expect( actions.setCost( 10 ) ).toMatchSnapshot();
	} );

	it( 'Should set the position of the symbol', () => {
		expect( actions.setPosition( 'suffix' ) ).toMatchSnapshot();
	} );

	it( 'Should set the price description', () => {
		expect( actions.setDescription( 'My description' ) ).toMatchSnapshot();
	} );

	it( 'Should set the symbol', () => {
		expect( actions.setSymbol( '€' ) ).toMatchSnapshot();
	} );

	it( 'Should toggle the prefix', () => {
		expect( actions.togglePosition( true ) ).toMatchSnapshot();
		expect( actions.togglePosition( false ) ).toMatchSnapshot();
	} );
} );

describe( '[STORE] - Price thunk actions', () => {
	it( 'Should set the initial state', () => {
		const store = mockStore( {} );
		const get = jest.fn( ( key ) => {
			const values = {
				cost: 10,
				currencySymbol: '€',
				costDescription: 'Not so expensive',
				currencyPosition: 'suffix',
			};
			return values[ key ];
		} );

		store.dispatch( actions.setInitialState( { get } ) );

		expect( get ).toHaveBeenCalled();
		expect( get ).toHaveBeenCalledTimes( 4 );
		expect( store.getActions() ).toMatchSnapshot();
	} );
} );
