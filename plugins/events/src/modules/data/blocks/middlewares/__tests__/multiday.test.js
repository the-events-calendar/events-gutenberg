/**
 * Internal dependencies
 */
import { multiDay } from '@@tribe/events/data/blocks/middlewares';
import { actions as mockedActions } from '@@tribe/events/data/blocks/datetime';
import * as actions from '@@tribe/events/data/blocks/datetime/actions';

let create;
let state = {};

jest.mock( '@@tribe/events/data/blocks/datetime', () => {
	const original = require.requireActual( '@@tribe/events/data/blocks/datetime' );
	return {
		...original,
		actions: {
			setStart: jest.fn(),
			setEnd: jest.fn(),
			setAllDay: jest.fn(),
		},
	};
} );

describe( '[STORE] - date middleware', () => {
	beforeEach( () => {
		state = {
			blocks: {
				datetime: {
					start: '2018-04-5 17:00',
					end: '2018-04-5 17:30',
					allDay: false,
					multiDay: false,
				},
			},
		};

		create = () => {
			const store = {
				getState: jest.fn( () => state ),
				dispatch: jest.fn(),
			};

			const next = jest.fn();

			const invoke = ( action ) => multiDay( store )( next )( action );
			return { store, next, invoke };
		};
	} );

	afterEach( () => {
		mockedActions.setStart.mockClear();
		mockedActions.setEnd.mockClear();
		mockedActions.setAllDay.mockClear();
	} );

	it( 'Should move through a unknown action', () => {
		const { store, next, invoke } = create();
		const action = { type: 'UNKNOWN' };
		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.dispatch ).not.toHaveBeenCalled();
		expect( store.getState ).not.toHaveBeenCalled();
	} );

	it( 'Should reset the dates when multiday is disabled', () => {
		const { store, next, invoke } = create();
		const action = actions.toggleMultiDay();
		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-04-05 17:00:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-04-05 17:30:00' );
	} );

	it( 'Should prevent collision when multiday is disabled and dates are at the same time', () => {
		// Adjust the end time to use the same time as start
		state.blocks.datetime.end = '2018-04-10 17:00:00';
		const { store, next, invoke } = create();
		const action = actions.toggleMultiDay();

		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-04-05 17:00:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-04-05 18:00:00' );
	} );

	it( 'Should adjust the end time when multiday is disabled and before start', () => {
		// Adjust the end time to use a time before the start
		state.blocks.datetime.end = '2018-04-10 8:00:00';
		const { store, next, invoke } = create();
		const action = actions.toggleMultiDay();

		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-04-05 17:00:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-04-05 18:00:00' );
	} );

	it( 'Should adjust the end time when multiday is enabled and is on the same day', () => {
		// Set the state on the store to be a multiday
		state.blocks.datetime.multiDay = true;
		const { store, next, invoke } = create();
		const action = actions.toggleMultiDay();

		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setStart ).not.toHaveBeenCalled();
		expect( mockedActions.setAllDay ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setAllDay ).toHaveBeenCalledWith( false );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-04-08 17:30:00' );
	} );

	it( 'Should just disable the all day action when dates are not the same on multi day', () => {
		// Set the state on the store to be a multiday
		state.blocks.datetime.multiDay = true;
		state.blocks.datetime.end = '2018-04-10 8:00:00';
		const { store, next, invoke } = create();
		const action = actions.toggleMultiDay();

		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setAllDay ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setAllDay ).toHaveBeenCalledWith( false );
		expect( mockedActions.setStart ).not.toHaveBeenCalled();
		expect( mockedActions.setEnd ).not.toHaveBeenCalled();
	});
} );
