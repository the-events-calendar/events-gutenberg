/**
 * Internal dependencies
 */
import { types } from '@moderntribe/tickets/data/blocks/ticket';

export const DEFAULT_STATE = {
	sharedCapacity: '',
};

export default ( state = {}, action ) => {
	switch ( action.type ) {
		case types.SET_TICKET_TMP_TICKET_SHARED_CAPACITY: {
			return {
				...state,
				sharedCapacity: action.payload.sharedCapacity,
			};
		}
		default:
			return state;
	}
}
