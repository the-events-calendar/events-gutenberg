
/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import { thunks } from 'data/blocks/datetime';
import { DAY_IN_SECONDS } from 'utils/time';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

let initialState = {};
let store;

describe( '[STORE] - Datetime thunks', () => {
	beforeEach( () => {
		initialState = {
			blocks: {
				datetime: {
					start: '2018-06-05 17:00:00',
					end: '2018-06-05 17:30:00',
					dateTimeSeparator: ' @ ',
					timeRangeSeparator: ' - ',
					allDay: false,
					multiDay: false,
					timezone: 'UTC',
				}
			}
		};

		store = mockStore( initialState );
	} );

	test( 'Initial set of state', () => {
		store = mockStore( {} );

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

	test( 'Set start time when All Day is not set', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			end: '2018-06-05 17:30:00',
			seconds: 7200,
			isAllDay: false,
		};

		store.dispatch( thunks.setStartTime( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set start time when All Day is set', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			end: '2018-06-05 17:30:00',
			seconds: 0,
			isAllDay: true,
		};

		store.dispatch( thunks.setStartTime( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set end time when All Day is not set', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			end: '2018-06-05 17:30:00',
			seconds: 64800,
			isAllDay: false,
		};

		store.dispatch( thunks.setStartTime( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set end time when All Day is set', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			end: '2018-06-05 17:30:00',
			seconds: DAY_IN_SECONDS - 1,
			isAllDay: true,
		};

		store.dispatch( thunks.setStartTime( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set dates from date picker with multi day off', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			end: '2018-06-05 17:30:00',
			from: new Date( 'Wed Sep 19 2018 12:00:00' ),
			to: undefined,
		};

		store.dispatch( thunks.setDates( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set dates from date picker with multi day on', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			end: '2018-06-05 17:30:00',
			from: new Date( 'Wed Sep 19 2018 12:00:00' ),
			to: new Date( 'Fri Sep 21 2018 12:00:00' ),
		};

		store.dispatch( thunks.setDates( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set multi day', () => {

	} );
} );
