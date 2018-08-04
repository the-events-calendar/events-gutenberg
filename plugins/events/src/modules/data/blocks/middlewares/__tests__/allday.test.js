/**
 * Internal dependencies
 */
import { allDay } from '@@tribe/events/data/blocks/middlewares';
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
			setMultiDay: jest.fn(),
		},
	};
} );

describe( '[STORE] - All day middleware', () => {
	beforeEach( () => {
		state = {
			blocks: {
				datetime: {
					start: '2018-06-10 10:00:00',
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

			const invoke = ( action ) => allDay( store )( next )( action );
			return { store, next, invoke };
		};
	} );

	afterEach( () => {
		mockedActions.setStart.mockClear();
		mockedActions.setEnd.mockClear();
		mockedActions.setMultiDay.mockClear();
	} );

	it( 'Should move through a unknown action', () => {
		const { store, next, invoke } = create();
		const action = { type: 'UNKNOWN' };
		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.dispatch ).not.toHaveBeenCalled();
		expect( store.getState ).not.toHaveBeenCalled();
		expect( mockedActions.setStart ).not.toHaveBeenCalled();
		expect( mockedActions.setEnd ).not.toHaveBeenCalled();
		expect( mockedActions.setMultiDay ).not.toHaveBeenCalled();
	} );

	it( 'Should bail early if the event is not all day', () => {
		const { store, next, invoke } = create();
		invoke( actions.setAllDay( true ) );
		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( actions.setAllDay( true ) );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).not.toHaveBeenCalled();
		expect( mockedActions.setStart ).not.toHaveBeenCalled();
		expect( mockedActions.setEnd ).not.toHaveBeenCalled();
		expect( mockedActions.setMultiDay ).not.toHaveBeenCalled();
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
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-06-10 00:00:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-06-10 23:59:59' );
		expect( mockedActions.setMultiDay ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setMultiDay ).toHaveBeenCalledWith( false );
	} );
} );
