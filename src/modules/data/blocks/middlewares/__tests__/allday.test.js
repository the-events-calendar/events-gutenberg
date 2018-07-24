/**
 * Internal dependencies
 */
import { allDay } from 'data/blocks/middlewares';
import { actions as mockedActions } from 'data/blocks/datetime';
import * as actions from 'data/blocks/datetime/actions';

let create;
let state = {};

jest.mock( 'data/blocks/datetime', () => {
	const original = require.requireActual( 'data/blocks/datetime' );
	return {
		...original,
		actions: {
			setStart: jest.fn(),
			setEnd: jest.fn(),
			setMultiDay: jest.fn(),
		},
	};
} );

describe( '[STORE] - All day middleware', () => {
	beforeEach( () => {
		state = {
			blocks: {
				datetime: {
					start: 'June 10, 2018 10:00 am',
					end: 'June 10, 2018 2:30 pm',
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

			const invoke = ( action ) => allDay( store )( next )( action );
			return { store, next, invoke };
		};
	} );

	afterEach( () => {
		mockedActions.setStart.mockClear();
		mockedActions.setEnd.mockClear();
		mockedActions.setMultiDay.mockClear();
	} );

	it( 'Should move through a non unknown action', () => {
		const { store, next, invoke } = create();
		const action = { type: 'UNKNOWN' };
		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.dispatch ).not.toHaveBeenCalled();
		expect( store.getState ).not.toHaveBeenCalled();
	} );

	it( 'Should bail early if the event is not all day', () => {
		const { store, next, invoke } = create();
		invoke( actions.setAllDay( true ) );
		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setAllDay( true ) );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).not.toHaveBeenCalled();
	} );

	it( 'Should update the start end time of the event on all day event', () => {
		const { store, next, invoke } = create();
		state.blocks.datetime.allDay = true;
		invoke( actions.setAllDay( true ) );
		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setAllDay( true ) );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 3 );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( 'June 10, 2018 12:00 am' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( 'June 10, 2018 11:59 pm' );
		expect( mockedActions.setMultiDay ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setMultiDay ).toHaveBeenCalledWith( false );
	} );
} );
