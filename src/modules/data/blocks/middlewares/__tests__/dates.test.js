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
		},
	};
} );

describe( '[STORE] - date middleware', () => {
	beforeEach( () => {
		state = {
			blocks: {
				datetime: {
					start: 'June 20, 2018 5:00 pm',
					end: 'June 20, 2018 5:30 pm',
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
		const action = actions.setDate( 'April 10, 2018' );
		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( 'April 10, 2018 5:00 pm' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( 'April 10, 2018 5:30 pm' );
	} );

	it( 'Should set only the dates using the "to" and "from" params', () => {
		const { store, next, invoke } = create();
		const action = actions.setDate( 'September 12, 2018 10:30', 'November 20, 2018 6:00pm' );
		invoke( action );

		expect( next ).toHaveBeenCalledTimes( 1 );
		expect( next ).toHaveBeenCalledWith( action );
		expect( store.getState ).toHaveBeenCalledTimes( 1 );
		expect( store.dispatch ).toHaveBeenCalledTimes( 2 );
		expect( mockedActions.setStart ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setStart ).toHaveBeenCalledWith( 'September 12, 2018 5:00 pm' );
		expect( mockedActions.setEnd ).toHaveBeenCalledTimes( 1 );
		expect( mockedActions.setEnd ).toHaveBeenCalledWith( 'November 20, 2018 5:30 pm' );
	} );
} );
