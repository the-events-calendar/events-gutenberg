/**
 * Internal dependencies
 */
import * as actions from '../actions';
import reducer, { DEFAULT_STATE } from '../reducer';

describe( '[STORE] - Status reducer', () => {
	it( 'Should return the default state', () => {
		expect( reducer( undefined, {} ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'Should set status', () => {
		const current = reducer( DEFAULT_STATE, actions.setSeriesQueueStatus( { cool: true } ) );
		expect( current ).toMatchSnapshot();
	} );
} );
