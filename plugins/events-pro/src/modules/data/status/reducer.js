/**
 * Internal dependencies
 */
import * as types from './types';

export const DEFAULT_STATE = {};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_SERIES_QUEUE_STATUS:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
