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

	it( 'Should select the is repeat block visible state', () => {
		expect( selectors.isRepeatBlockVisible( state ) ).toEqual( DEFAULT_STATE.isRepeatBlockVisible );
	} );

	it( 'Should select the is rule panel visibile state', () => {
		expect( selectors.isRulePanelVisible( state ) ).toEqual( DEFAULT_STATE.isRulePanelVisible );
	} );

	it( 'Should select the is exception panel visible state', () => {
		expect( selectors.isExceptionPanelVisible( state ) ).toEqual( DEFAULT_STATE.isExceptionPanelVisible );
	} );

	it( 'Should select the is rule panel expanded state', () => {
		expect( selectors.isRulePanelExpanded( state ) ).toEqual( DEFAULT_STATE.isRulePanelExpanded );
	} );

	it( 'Should select the is exception panel expanded state', () => {
		expect( selectors.isExceptionPanelExpanded( state ) ).toEqual( DEFAULT_STATE.isExceptionPanelExpanded );
	} );
} );
