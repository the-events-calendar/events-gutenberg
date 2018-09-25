/**
 * Internal dependencies
 */
import * as types from './../types';

export const DEFAULT_STATE = {
	sharedCapacity: '',
	header: null,
	isSettingsOpen: false,
	isParentBlockSelected: false,
	isChildBlockSelected: false,
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_TICKET_HEADER:
			return {
				...state,
				header: action.payload.header,
			};
		case types.SET_TICKET_TOTAL_SHARED_CAPACITY:
			return {
				...state,
				sharedCapacity: action.payload.sharedCapacity,
			};
		case types.SET_TICKET_SETTINGS_OPEN:
			return {
				...state,
				isSettingsOpen: action.payload.isSettingsOpen,
			};
		case types.SET_PARENT_BLOCK_SELECTED:
			return {
				...state,
				isParentBlockSelected: action.payload.selected,
			};
		case types.SET_CHILD_BLOCK_SELECTED:
			return {
				...state,
				isChildBlockSelected: action.payload.selected,
			};
		default:
			return state;
	}
}
