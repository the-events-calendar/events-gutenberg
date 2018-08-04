/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
/**
 * Internal dependencies
 */
import { actions } from '@@plugins/events/data/blocks/venue';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - Venue actions', () => {
	test( 'action to set the venue', () => {
		expect( actions.setVenue( 99 ) ).toMatchSnapshot();
	} );

	test( 'action to set the showMap', () => {
		expect( actions.setShowMap( false ) ).toMatchSnapshot();
		expect( actions.setShowMap( true ) ).toMatchSnapshot();
	} );

	test( 'action to set the showMapLink', () => {
		expect( actions.setShowMapLink( true ) ).toMatchSnapshot();
		expect( actions.setShowMapLink( false ) ).toMatchSnapshot();
	} );

	test( 'action to set the venue removal', () => {
		expect( actions.removeVenue() ).toMatchSnapshot();
	} );

	test( 'action to toggle the venue map', () => {
		expect( actions.toggleVenueMap() ).toMatchSnapshot();
	} );

	test( 'action to toggle the venueMapLink', () => {
		expect( actions.toggleVenueMapLink() ).toMatchSnapshot();
	} );
} );

describe( '[STORE] - Venue thunk actions', () => {
	test( 'Initial set of state', () => {
		const store = mockStore( {} );

		const get = jest.fn( ( key ) => {
			const values = {
				venue: 99,
				showMap: true,
				showMapLink: true,
			};
			return values[ key ];
		} );

		store.dispatch( actions.setInitialState( { get } ) );

		expect( get ).toHaveBeenCalled();
		expect( get ).toHaveBeenCalledTimes( 3 );
		expect( store.getActions() ).toMatchSnapshot();
	} );
} );

