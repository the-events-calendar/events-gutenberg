/**
 * Internal dependencies
 */
import { actions } from '@moderntribe/events-pro/data/ui';
import reducer, { DEFAULT_STATE } from '@moderntribe/events-pro/data/ui/reducer';

describe( '[STORE] - UI reducer', () => {
	it( 'Should return the default state', () => {
		expect( reducer( undefined, {} ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'Should toggle repeat panel', () => {
		const current = reducer( { isRepeatBlockVisible: false }, actions.toggleRepeatBlocksVisibility() );
		expect( current ).toMatchSnapshot();
	} );
} );
