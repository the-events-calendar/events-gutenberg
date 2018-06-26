/**
 * Internal dependencies
 */
import * as types from './types';

const DEFAULT_STATE = {
	url: undefined,
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_WEBSITE_URL:
			return {
				...state,
				url: action.payload.url,
			};
		default:
			return state;
	}
};
