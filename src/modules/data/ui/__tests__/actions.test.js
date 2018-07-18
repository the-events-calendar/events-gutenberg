/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { noop } from 'lodash';
import moment from 'moment';

/**
 * Internal dependencies
 */
import { actions, types } from 'data/ui';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - UI actions', () => {
	it( 'Should toggle the dashboard', () => {
		const expectedAction = {
			type: types.TOGGLE_DASHBOARD_DATE_TIME,
		};
		expect( actions.toggleDashboard() ).toEqual( expectedAction );
	} );

	it( 'Should open the dashboard', () => {
		const expectedAction = {
			type: types.SET_DASHBOARD_DATE_TIME,
			payload: {
				open: true,
			},
		};
		expect( actions.openDashboard() ).toEqual( expectedAction );
	} );

	it( 'Should close the dashboard', () => {
		const expectedAction = {
			type: types.SET_DASHBOARD_DATE_TIME,
			payload: {
				open: false,
			},
		};
		expect( actions.closeDashboard() ).toEqual( expectedAction );
	} );

	it( 'Should set the visible month', () => {
		Date.now = jest.fn( () => '2018-07-01T05:00:00.000Z' );
		const expectedAction = {
			type: types.SET_VISIBLE_MONTH,
			payload: {
				visibleMonth: Date.now(),
			},
		};
		expect( actions.setVisibleMonth( Date.now() ) ).toEqual( expectedAction );
	} );

	it( 'Should not set the initial state', () => {
		const store = mockStore( {} );
		store.dispatch( actions.setInitialState( { get: noop } ) );
		expect( store.getActions() ).toEqual( [] );
	} );
} );

describe( '[STORE] - UI thunk actions', () => {
	it( 'Should set the initial state', () => {
		const store = mockStore( {} );

		store.dispatch(
			actions.setInitialState( {
				get: () => moment(),
			} ),
		);

		const expectedAction = [
			{
				type: types.SET_VISIBLE_MONTH,
				payload: {
					visibleMonth: moment().startOf( 'month' ).toDate(),
				},
			},
		];
		expect( store.getActions() ).toEqual( expectedAction );
	} );
} );
