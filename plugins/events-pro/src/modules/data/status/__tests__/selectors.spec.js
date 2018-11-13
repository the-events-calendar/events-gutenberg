/**
 * External Dependencies
 */
import * as selectors from '../selectors';
import { constants } from '@moderntribe/common/data/plugins';

describe( 'Status selectors', () => {
	let state;
	beforeEach( () => {
		state = {
			[ constants.EVENTS_PRO_PLUGIN ]: {
				status: {
					done: true,
					progress: 60,
				},
			},
		};
	} );

	const keys = Object.keys( selectors );

	keys.forEach( ( key ) => {
		test( key, () => {
			expect( selectors[ key ]( state ) ).toMatchSnapshot();
		} );
	} );
} );
