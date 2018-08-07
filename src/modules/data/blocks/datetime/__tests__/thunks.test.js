
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

	test( 'Set start time', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			seconds: 7200,
		};

		store.dispatch( thunks.setStartTime( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set end time', () => {
		Date.now = jest.fn( () => '2018-08-06T05:23:19.000Z' );
		const attributes = {
			end: '2018-06-05 17:30:00',
			seconds: 64800,
		};

		store.dispatch( thunks.setStartTime( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set all day on', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			end: '2018-06-05 17:30:00',
			isAllDay: true,
		};

		store.dispatch( thunks.setAllDayThunk( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set all day off', () => {
		const attributes = {
			start: '2018-06-05 00:00:00',
			end: '2018-06-05 23:59:59',
			isAllDay: false,
		};

		store.dispatch( thunks.setAllDayThunk( attributes ) );

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

	test( 'Set multi day to true', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			end: '2018-06-05 17:30:00',
			checked: true,
		};

		store.dispatch( thunks.setMultiDayThunk( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set multi day to false when end time is later than start time', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			end: '2018-06-08 17:30:00',
			checked: false,
		};

		store.dispatch( thunks.setMultiDayThunk( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set multi day to false when end time is earlier than start time', () => {
		const attributes = {
			start: '2018-06-05 17:00:00',
			end: '2018-06-08 15:30:00',
			checked: false,
		};

		store.dispatch( thunks.setMultiDayThunk( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'Set multi day to false when end time is earlier than start time', () => {
		const attributes = {
			start: '2018-06-05 23:30:00',
			end: '2018-06-08 15:30:00',
			checked: false,
		};

		store.dispatch( thunks.setMultiDayThunk( attributes ) );

		expect( store.getActions() ).toMatchSnapshot();
	} );
} );
