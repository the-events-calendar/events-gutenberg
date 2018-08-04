/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
/**
 * Internal dependencies
 */
import { actions } from '@@plugins/events/data/blocks/classic';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - Classic actions', () => {
	test( 'Action to set the organizer title', () => {
		expect( actions.setOrganizerTitle( 'Modern Tribe' ) ).toMatchSnapshot();
	} );

	test( 'Action to set the details title', () => {
		expect( actions.setDetailsTitle( 'Events' ) ).toMatchSnapshot();
	} );
} );

describe( '[STORE] - Classic thunk actions', () => {
	test( 'Action to set the initial state', () => {
		const store = mockStore();
		const get = jest.fn( ( key ) => {
			const values = {
				detailsTitle: 'Events',
				organizerTitle: 'Modern Tribe',
			};
			return values[ key ];
		} );

		store.dispatch( actions.setInitialState( { get } ) );

		expect( get ).toHaveBeenCalled();
		expect( get ).toHaveBeenCalledTimes( 2 );
		expect( store.getActions() ).toMatchSnapshot();
	} );
} );
