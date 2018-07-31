/**
 * Internal dependencies
 */
import { dates } from 'data/blocks/middlewares';
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

describe( '[STORE] - date middleware', () => {
	beforeEach( () => {
		state = {
			blocks: {
				datetime: {
					start: '2018-06-20 17:00',
					end: '2018-06-20 17:30',
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

			const invoke = ( action ) => dates( store )( next )( action );
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
	} );

	it( 'Should set only the dates using only the "to" param', () => {
		const { store, next, invoke } = create();
		const action = actions.setDates( '2018-04-10' );
		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-04-10 17:00:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-04-10 17:30:00' );
		expect( mockedActions.setMultiDay ).not.toHaveBeenCalled();
	} );

	it( 'Should set only the dates using the "to" and "from" params', () => {
		const { store, next, invoke } = create();
		const action = actions.setDates( '2018-09-12 10:30:00', '2018-11-20 18:00' );
		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 3 );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-09-12 17:00:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-11-20 17:30:00' );
		expect( mockedActions.setMultiDay ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setMultiDay ).toHaveBeenCalledWith( true );
	} );

	it( 'Should set the full date with time', () => {
		const { store, next, invoke } = create();
		const action = actions.setDateTime( '2018-09-12 12:00:00', '2018-09-13' );
		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 3 );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( '2018-09-12 12:00:00' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( '2018-09-13 00:00:00' );
		expect( mockedActions.setMultiDay ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setMultiDay ).toHaveBeenCalledWith( true );
	} );
} );
