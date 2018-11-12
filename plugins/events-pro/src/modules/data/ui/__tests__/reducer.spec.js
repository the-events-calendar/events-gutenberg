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
		const current = reducer( DEFAULT_STATE, actions.toggleRepeatBlocksVisibility() );
		expect( current ).toMatchSnapshot();
	} );

	it( 'Should toggle rule panel', () => {
		const current = reducer( DEFAULT_STATE, actions.toggleRulePanelVisibility() );
		expect( current ).toMatchSnapshot();
	} );

	it( 'Should hide rule panel', () => {
		const current = reducer( { ...DEFAULT_STATE, isRulePanelVisible: true }, actions.hideRulePanel() );
		expect( current ).toMatchSnapshot();
	} );

	it( 'Should toggle exception panel', () => {
		const current = reducer( DEFAULT_STATE, actions.toggleExceptionPanelVisibility() );
		expect( current ).toMatchSnapshot();
	} );

	it( 'Should hide exception panel', () => {
		const current = reducer( { ...DEFAULT_STATE, isExceptionPanelVisible: true }, actions.hideExceptionPanel() );
		expect( current ).toMatchSnapshot();
	} );

	it( 'Should toggle rule panel expand', () => {
		const current = reducer( DEFAULT_STATE, actions.toggleRulePanelExpand() );
		expect( current ).toMatchSnapshot();
	} );

	it( 'Should expand rule panel', () => {
		const current = reducer( DEFAULT_STATE, actions.expandRulePanel() );
		expect( current ).toMatchSnapshot();
	} );

	it( 'Should toggle exception panel expand', () => {
		const current = reducer( DEFAULT_STATE, actions.toggleExceptionPanelExpand() );
		expect( current ).toMatchSnapshot();
	} );

	it( 'Should expand exception panel', () => {
		const current = reducer( DEFAULT_STATE, actions.expandExceptionPanel() );
		expect( current ).toMatchSnapshot();
	} );
} );
