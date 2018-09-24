/**
 * Internal dependencies
 */
import { types } from '@moderntribe/tickets/data/blocks/ticket';

export const DEFAULT_STATE = {
	sharedCapacity: '',
	header: null,
	isSettingsOpen: false,
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_TICKET_HEADER:
			return {
				...state,
				header: action.payload.header,
			};
		case types.SET_TICKET_SHARED_CAPACITY:
			return {
				...state,
				sharedCapacity: action.payload.sharedCapacity,
			};
		case types.SET_TICKET_SETTINGS_OPEN:
			return {
				...state,
				isSettingsOpen: action.payload.isSettingsOpen,
			};
		default:
			return state;
	}
}
