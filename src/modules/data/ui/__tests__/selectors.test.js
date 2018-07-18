/**
 * Internal dependencies
 */
import { selectors } from 'data/ui';
import { DEFAULT_STATE } from 'data/ui/reducer';

const state = {
	ui: DEFAULT_STATE,
};

describe( '[STORE] - UI Selectors', () => {
	it( 'Should select the UI block', () => {
		expect( selectors.getUI( state ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'Should select the visible month', () => {
		expect( selectors.getVisibleMonth( state ) ).toEqual( DEFAULT_STATE.visibleMonth );
	} );

	it( 'Should select the status of dashboard', () => {
		expect( selectors.getDashboardOpen( state ) ).toEqual( DEFAULT_STATE.dashboardDateTimeOpen );
	} );
} );
