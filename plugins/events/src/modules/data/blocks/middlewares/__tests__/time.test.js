/**
 * Internal dependencies
 */
import { HOUR_IN_SECONDS, MINUTE_IN_SECONDS } from '@moderntribe/events/editor/utils/time';
import { startTime, endTime } from '@moderntribe/events/data/blocks/middlewares';
import { actions as mockedActions } from '@moderntribe/events/data/blocks/datetime';
import * as actions from '@moderntribe/events/data/blocks/datetime/actions';

let create;
let state = {};

jest.mock( '@moderntribe/events/data/blocks/datetime', () => {
	const original = require.requireActual( '@moderntribe/events/data/blocks/datetime' );
	return {
		...original,
		actions: {
			setAllDay: jest.fn(),
			setStart: jest.fn(),
			setEnd: jest.fn(),
			toggleMultiDay: jest.fn(),
		},
	};
} );

describe( '[STORE] - startTime middleware', () => {
	beforeEach( () => {
		state = {
			blocks: {
				datetime: {
					start: '2018-06-19 17:00',
					end: '2018-06-19 17:30',
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

			const invoke = ( action ) => startTime( store )( next )( action );
			return { store, next, invoke };
		};
	} );

	afterEach( () => {
		mockedActions.setStart.mockClear();
		mockedActions.setEnd.mockClear();
		mockedActions.setAllDay.mockClear();
		mockedActions.toggleMultiDay.mockClear();
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

	it( 'Should set the start time', () => {
		const { store, next, invoke } = create();
		invoke( actions.setStartTime( HOUR_IN_SECONDS ) );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setStartTime( HOUR_IN_SECONDS ) );
		expect( store.dispatch ).toHaveBeenCalledTimes( 1 );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-06-19 01:00:00' );
		expect( mockedActions.setAllDay ).not.toHaveBeenCalled();
		expect( mockedActions.setEnd ).not.toHaveBeenCalled();
	} );

	it( 'Should disable the allDay event when setting the start time', () => {
		state.blocks.datetime.allDay = true;
		const { store, next, invoke } = create();
		const start = HOUR_IN_SECONDS * 2;
		invoke( actions.setStartTime( start ) );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setStartTime( start ) );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setAllDay ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setAllDay ).toHaveBeenLastCalledWith( false );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-06-19 02:00:00' );
		expect( mockedActions.setEnd ).not.toHaveBeenCalled();
	} );

	it( 'Should increase the end time by one hour when start time is after the end time', () => {
		const { store, next, invoke } = create();
		const start = HOUR_IN_SECONDS * 18;

		invoke( actions.setStartTime( start ) );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setStartTime( start ) );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setAllDay ).not.toHaveBeenCalled();
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-06-19 18:00:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-06-19 19:00:00' );
	} );

	it( 'Should enable multi day of end time does not fit on the same day', () => {
		const { store, next, invoke } = create();
		const start = ( HOUR_IN_SECONDS * 23 ) + ( MINUTE_IN_SECONDS * 59 );

		invoke( actions.setStartTime( start ) );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setStartTime( start ) );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 3 );
		expect( mockedActions.setAllDay ).not.toHaveBeenCalled();
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-06-19 23:59:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-06-20 00:59:00' );
		expect( mockedActions.toggleMultiDay ).toHaveBeenCalledTimes( 1 );
	} );
} );

describe( '[STORE] - endTIme middleware', () => {
	beforeEach( () => {
		state = {
			blocks: {
				datetime: {
					start: '2018-06-10 8:00:00',
					end: '2018-06-10 14:30:00',
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

			const invoke = ( action ) => endTime( store )( next )( action );
			return { store, next, invoke };
		};
	} );

	afterEach( () => {
		mockedActions.setStart.mockClear();
		mockedActions.setEnd.mockClear();
		mockedActions.setAllDay.mockClear();
		mockedActions.toggleMultiDay.mockClear();
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

	it( 'Should set the end time', () => {
		const { store, next, invoke } = create();
		const end = HOUR_IN_SECONDS * 10;
		invoke( actions.setEndTime( end ) );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setEndTime( end ) );
		expect( store.dispatch ).toHaveBeenCalledTimes( 1 );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-06-10 10:00:00' );
		expect( mockedActions.setAllDay ).not.toHaveBeenCalled();
		expect( mockedActions.setStart ).not.toHaveBeenCalled();
	} );

	it( 'Should disable the allDay event when setting the start time', () => {
		state.blocks.datetime.allDay = true;
		const { store, next, invoke } = create();
		const end = HOUR_IN_SECONDS * 11;
		invoke( actions.setEndTime( end ) );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setEndTime( end ) );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setAllDay ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setAllDay ).toHaveBeenLastCalledWith( false );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-06-10 11:00:00' );
		expect( mockedActions.setStart ).not.toHaveBeenCalled();
	} );

	it( 'Should decrease the start time by one hour when end time is before the start time', () => {
		const { store, next, invoke } = create();
		const end = HOUR_IN_SECONDS * 7;

		invoke( actions.setEndTime( end ) );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setEndTime( end ) );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setAllDay ).not.toHaveBeenCalled();
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-06-10 06:00:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-06-10 07:00:00' );
	} );

	it( 'Should enable multi day when end time is the first time of the day', () => {
		const { store, next, invoke } = create();
		const end = 0;

		invoke( actions.setEndTime( end ) );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setEndTime( end ) );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 3 );
		expect( mockedActions.setAllDay ).not.toHaveBeenCalled();
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-06-09 23:00:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-06-10 00:00:00' );
		expect( mockedActions.toggleMultiDay ).toHaveBeenCalledTimes( 1 );
	} );
} );
