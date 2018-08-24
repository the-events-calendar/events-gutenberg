/**
 * Internal dependencies
 */
import { selectors } from '@moderntribe/events-pro/data/ui';
import { DEFAULT_STATE } from '@moderntribe/events-pro/data/ui/reducer';

const state = {
	'events-pro': {
		ui: DEFAULT_STATE,
	},
};

describe( '[STORE] - UI Selectors', () => {
	it( 'Should select the UI block', () => {
		expect( selectors.getUI( state ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'Should select the repeat block visible state', () => {
		expect( selectors.isRepeatBlockVisible( state ) ).toEqual( DEFAULT_STATE.isRepeatBlockVisible );
	} );
} );
