/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
/**
 * Internal dependencies
 */
import { actions } from 'data/blocks/datetime';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - Datetime actions', () => {
	test( 'Action to set the start time', () => {
		expect( actions.setStart( 'June 5, 2018 5:00 pm' ) ).toMatchSnapshot();
	} );

	test( 'Action to set the start time', () => {
		expect( actions.setEnd( 'June 25, 2018 4:00 pm' ) ).toMatchSnapshot();
	} );

	test( 'Action to set the separator date', () => {
		expect( actions.setSeparatorDate( ' -  ' ) ).toMatchSnapshot();
	} );

	test( 'Action to set the separator time', () => {
		expect( actions.setSeparatorTime( ' @ ' ) ).toMatchSnapshot();
	} );

	test( 'Action to set the time zone', () => {
		expect( actions.setTimeZone( 'UTC' ) ).toMatchSnapshot();
	} );

	test( 'Action to set all day', () => {
		expect( actions.setAllDay( true ) ).toMatchSnapshot();
		expect( actions.setAllDay( false ) ).toMatchSnapshot();
	} );

	test( 'Action to set the multi day', () => {
		expect( actions.setMultiDay( true ) ).toMatchSnapshot();
		expect( actions.setMultiDay( false ) ).toMatchSnapshot();
	} );
} );

describe( '[STORE] - Datetime thunk actions', () => {
	test( 'Initial set of state', () => {
		const store = mockStore( {} );

		const get = jest.fn( ( key ) => {
			const values = {
				start: 'June 5, 2018 5:00 pm',
				end: 'June 5, 2018 5:30 pm',
				dateTimeSeparator: ' @ ',
				timeRangeSeparator: ' - ',
				allDay: false,
				multiDay: false,
				timezone: 'UTC',
			};
			return values[ key ];
		} );

		store.dispatch( actions.setInitialState( { get } ) );

		expect( get ).toHaveBeenCalled();
		expect( get ).toHaveBeenCalledTimes( 2 );
		expect( store.getActions() ).toMatchSnapshot();
	} );
} );
