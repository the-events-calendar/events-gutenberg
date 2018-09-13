/**
 * Internal dependencies
 */
import * as types from '../types';

export default ( state = {}, action ) => {
	switch ( action.type ) {
		case types.TOGGLE_ACCORDION:
			return {
				...state,
				[ action.payload.accordionId ]: ! state[ action.payload.accordionId ],
			};
		case types.ADD_ACCORDION:
			return {
				...state,
				[ action.payload.accordionId ]: false,
			};
		case types.REMOVE_ACCORDION:
			const { [ action.payload.accordionId ]: value, ...filteredState } = state;
			return filteredState;
		default:
			return state;
	}
};
