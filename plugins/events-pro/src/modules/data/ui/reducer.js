/**
 * Internal dependencies
 */
import * as types from './types';

export const DEFAULT_STATE = {
	isRepeatBlockVisible: false,
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.TOGGLE_REPEAT_EVENTS_BLOCK_VISIBILITY:
			return {
				...state,
				isRepeatBlockVisible: ! state.isRepeatBlockVisible,
			};
		default:
			return state;
	}
};
