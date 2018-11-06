/**
 * Internal dependencies
 */
import * as types from './types';

export const DEFAULT_STATE = {
	isRepeatBlockVisible: false,
	isRulePanelVisible: false,
	isExceptionPanelVisible: false,
	isRulePanelExpanded: false,
	isExceptionPanelExpanded: false,
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.TOGGLE_REPEAT_EVENTS_BLOCK_VISIBILITY:
			return {
				...state,
				isRepeatBlockVisible: ! state.isRepeatBlockVisible,
			};
		case types.TOGGLE_RULE_PANEL_VISIBILITY:
			return {
				...state,
				isRulePanelVisible: ! state.isRulePanelVisible,
			};
		case types.HIDE_RULE_PANEL:
			return {
				...state,
				isRulePanelVisible: false,
			};
		case types.TOGGLE_EXCEPTION_PANEL_VISIBILITY:
			return {
				...state,
				isExceptionPanelVisible: ! state.isExceptionPanelVisible,
			};
		case types.HIDE_EXCEPTION_PANEL:
			return {
				...state,
				isExceptionPanelVisible: false,
			};
		case types.TOGGLE_RULE_PANEL_EXPAND:
			return {
				...state,
				isRulePanelExpanded: ! state.isRulePanelExpanded,
			};
		case types.EXPAND_RULE_PANEL:
			return {
				...state,
				isRulePanelExpanded: true,
			};
		case types.TOGGLE_EXCEPTION_PANEL_EXPAND:
			return {
				...state,
				isExceptionPanelExpanded: ! state.isExceptionPanelExpanded,
			};
		case types.EXPAND_EXCEPTION_PANEL:
			return {
				...state,
				isExceptionPanelExpanded: true,
			};
		default:
			return state;
	}
};
