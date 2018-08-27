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

export const toggleExceptionPanelVisibility = () => ( {
	type: types.TOGGLE_EXCEPTION_PANEL_VISIBILITY,
} );

export const toggleRulePanelExpand = () => ( {
	type: types.TOGGLE_RULE_PANEL_EXPAND,
} );

export const toggleExceptionPanelExpand = () => ( {
	type: types.TOGGLE_EXCEPTION_PANEL_EXPAND,
} );

