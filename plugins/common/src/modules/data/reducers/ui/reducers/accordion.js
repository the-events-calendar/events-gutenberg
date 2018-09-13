/**
 * Internal dependencies
 */
import * as types from '../types';

export default ( state = {}, action ) => {
	switch ( action.type ) {
		case types.OPEN_ACCORDION:
			return {
				...state,
				[ action.payload.id ]: true,
			};
		case types.CLOSE_ACCORDION:
		case types.ADD_ACCORDION:
			return {
				...state,
				[ action.payload.id ]: false,
			};
		case types.REMOVE_ACCORDION:
			const { [ action.payload.id ]: value, ...filteredState } = state;
			return filteredState;
		default:
			return state;
	}
};
