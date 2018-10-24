/**
 * Internal dependencies
 */
import { actions } from '@moderntribe/events-pro/data/ui';

describe( '[STORE] - UI actions', () => {
	it( 'Should toggle the repeat block', () => {
		expect( actions.toggleRepeatBlocksVisibility() ).toMatchSnapshot();
	} );
} );
