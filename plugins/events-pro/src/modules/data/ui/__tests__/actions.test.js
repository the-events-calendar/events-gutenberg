/**
 * Internal dependencies
 */
import { actions } from '@moderntribe/events-pro/data/ui';

describe( '[STORE] - UI actions', () => {
	test( 'toggleRepeatBlocksVisibility', () => {
		expect( actions.toggleRepeatBlocksVisibility() ).toMatchSnapshot();
	} );

	test( 'toggleRulePanelVisibility', () => {
		expect( actions.toggleRulePanelVisibility() ).toMatchSnapshot();
	} );

	test( 'hideRulePanel', () => {
		expect( actions.hideRulePanel() ).toMatchSnapshot();
	} );

	test( 'toggleExceptionPanelVisibility', () => {
		expect( actions.toggleExceptionPanelVisibility() ).toMatchSnapshot();
	} );

	test( 'toggleRulePanelExpand', () => {
		expect( actions.toggleRulePanelExpand() ).toMatchSnapshot();
	} );

	test( 'expandRulePanel', () => {
		expect( actions.expandRulePanel() ).toMatchSnapshot();
	} );

	test( 'hideExceptionPanel', () => {
		expect( actions.hideExceptionPanel() ).toMatchSnapshot();
	} );

	test( 'expandExceptionPanel', () => {
		expect( actions.expandExceptionPanel() ).toMatchSnapshot();
	} );

	test( 'toggleExceptionPanelExpand', () => {
		expect( actions.toggleExceptionPanelExpand() ).toMatchSnapshot();
	} );
} );
