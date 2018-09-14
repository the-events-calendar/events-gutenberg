/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import { thunks } from '@moderntribe/tickets/data/blocks/rsvp';
import { DEFAULT_STATE } from '@moderntribe/tickets/data/blocks/rsvp/reducer';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

let initialState = {};
let store;

describe( 'RSVP block thunks', () => {
	beforeEach( () => {
		initialState = {
			tickets: {
				blocks: {
					rsvp: DEFAULT_STATE,
				},
			},
		};

		store = mockStore( initialState );
	} );

	test( 'set RSVP header', () => {
		const data = {
			title: 'title',
			description: 'description',
		};

		store.dispatch( thunks.setRSVPHeader( data ) );
		expect( store.getActions() ).toMatchSnapshot();
	} );

	test( 'set RSVP header', () => {
		const data = {
			capacity: 20,
			enableNotGoing: true,
			startDate: 'January 1, 2018',
			endDate: 'January 2, 2018',
			startTime: '12:34',
			endTime: '23:45',
		};

		store.dispatch( thunks.setRSVPDetails( data ) );
		expect( store.getActions() ).toMatchSnapshot();
	} );
} );
