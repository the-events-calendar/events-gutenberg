
/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import { thunks } from 'data/blocks/datetime';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - Datetime thunks', () => {
	test( 'Initial set of state', () => {
		const store = mockStore( {} );

		const attributes = {
			start: 'June 5, 2018 5:00 pm',
			end: 'June 5, 2018 5:30 pm',
			dateTimeSeparator: ' @ ',
			timeRangeSeparator: ' - ',
			allDay: false,
			multiDay: false,
			timezone: 'UTC',
		};

		const get = jest.fn( ( key ) => {
			return attributes[ key ];
		} );

		store.dispatch( thunks.setInitialState( { get, attributes } ) );

		expect( get ).toHaveBeenCalled();
		expect( get ).toHaveBeenCalledTimes( 2 );
		expect( store.getActions() ).toMatchSnapshot();
	} );
} );
