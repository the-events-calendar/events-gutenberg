/**
 * Internal dependencies
 */
import * as types from './types';

export const toggleRepeatBlocksVisibility = () => ( {
	type: types.TOGGLE_REPEAT_EVENTS_BLOCK_VISIBILITY,
} );

export const toggleRulePanelVisibility = () => ( {
	type: types.TOGGLE_RULE_PANEL_VISIBILITY,
} );

export const hideRulePanel = () => ( {
	type: types.HIDE_RULE_PANEL,
} );

export const toggleExceptionPanelVisibility = () => ( {
	type: types.TOGGLE_EXCEPTION_PANEL_VISIBILITY,
} );

export const toggleRulePanelExpand = () => ( {
	type: types.TOGGLE_RULE_PANEL_EXPAND,
} );

export const expandRulePanel = () => ( {
	type: types.EXPAND_RULE_PANEL,
} );

export const hideExceptionPanel = () => ( {
	type: types.HIDE_EXCEPTION_PANEL,
} );

export const expandExceptionPanel = () => ( {
	type: types.EXPAND_EXCEPTION_PANEL,
} );

export const toggleExceptionPanelExpand = () => ( {
	type: types.TOGGLE_EXCEPTION_PANEL_EXPAND,
} );

