/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import { actions } from '@@tribe/events/data/details';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - Details actions', () => {
	test( 'Enable loading action', () => {
		expect( actions.enableLoading( 'events' ) ).toMatchSnapshot();
	} );

	test( 'Disable loading action', () => {
		expect( actions.disableLoading( 'events' ) ).toMatchSnapshot();
	} );

	test( 'Set details actions', () => {
		expect( actions.setDetails( 'events', { id: 20, title: 'Modern Tribe' } ) ).toMatchSnapshot();
	} );

	test( 'Set post type action', () => {
		expect( actions.setPostType( 'events', 'tribe_events' ) ).toMatchSnapshot();
	} );
} );

describe( '[STORE] - Thunk actions', () => {
	it( 'Should avoid fetching new details when loading', () => {
		const store = mockStore( {
			details: {
				20: {
					loading: true,
					details: {},
				},
			}
		} );
		store.dispatch( actions.fetchDetails( 20 ) );
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
		store.dispatch( actions.fetchDetails( 20 ) );
		expect( store.getActions() ).toMatchSnapshot();
	} );
} );
