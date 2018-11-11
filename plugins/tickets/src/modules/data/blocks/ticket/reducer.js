/**
 * Internal dependencies
 */
import tickets from './reducers/tickets';
import { DEFAULT_STATE as HEADER_DEFAULT_STATE } from './reducers/header';
import * as types from './types';

export const DEFAULT_STATE = {
	header: HEADER_DEFAULT_STATE,
	isSettingsOpen: false,
	isParentBlockSelected: false,
	isChildBlockSelected: false,
	isParentBlockLoading: false,
	activeChildBlockId: '',
	provider: '',
	sharedCapacity: '',
	tempSharedCapacity: '',
	tickets: tickets( undefined, {} ),
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_TICKETS_HEADER:
			return {
				...state,
				header: action.payload.header,
			};
		case types.SET_TICKETS_IS_SETTINGS_OPEN:
			return {
				...state,
				isSettingsOpen: action.payload.isSettingsOpen,
			};
		case types.SET_TICKETS_IS_PARENT_BLOCK_LOADING:
			return {
				...state,
				isParentBlockSelected: action.payload.isParentBlockSelected,
			};
		case types.SET_TICKETS_IS_CHILD_BLOCK_SELECTED:
			return {
				...state,
				isChildBlockSelected: action.payload.isChildBlockSelected,
			};
		case types.SET_TICKETS_IS_PARENT_BLOCK_SELECTED:
			return {
				...state,
				isParentBlockLoading: action.payload.isParentBlockLoading,
			};
		case types.SET_TICKETS_ACTIVE_CHILD_BLOCK_ID:
			return {
				...state,
				activeChildBlockId: action.payload.activeChildBlockId,
			};
		case types.SET_TICKETS_PROVIDER:
			return {
				...state,
				provider: action.payload.provider,
			};
		case types.SET_TICKETS_SHARED_CAPACITY:
			return {
				...state,
				sharedCapacity: action.payload.sharedCapacity,
			};
		case types.SET_TICKETS_TEMP_SHARED_CAPACITY:
			return {
				...state,
				tempSharedCapacity: action.payload.tempSharedCapacity,
			};
		case types.SET_TICKET_TITLE:
		case types.SET_TICKET_DESCRIPTION:
		case types.SET_TICKET_PRICE:
		case types.SET_TICKET_SKU:
		case types.SET_TICKET_START_DATE:
		case types.SET_TICKET_START_DATE_MOMENT:
		case types.SET_TICKET_END_DATE:
		case types.SET_TICKET_END_DATE_MOMENT:
		case types.SET_TICKET_START_TIME:
		case types.SET_TICKET_END_TIME:
		case types.SET_TICKET_CAPACITY_TYPE:
		case types.SET_TICKET_CAPACITY:
		case types.SET_TICKET_TEMP_TITLE:
		case types.SET_TICKET_TEMP_DESCRIPTION:
		case types.SET_TICKET_TEMP_PRICE:
		case types.SET_TICKET_TEMP_SKU:
		case types.SET_TICKET_TEMP_START_DATE:
		case types.SET_TICKET_TEMP_START_DATE_MOMENT:
		case types.SET_TICKET_TEMP_END_DATE:
		case types.SET_TICKET_TEMP_END_DATE_MOMENT:
		case types.SET_TICKET_TEMP_START_TIME:
		case types.SET_TICKET_TEMP_END_TIME:
		case types.SET_TICKET_TEMP_CAPACITY_TYPE:
		case types.SET_TICKET_TEMP_CAPACITY:
		case types.SET_TICKET_SOLD:
		case types.SET_TICKET_AVAILABLE:
		case types.SET_TICKET_ID:
		case types.SET_TICKET_CURRENCY_SYMBOL:
		case types.SET_TICKET_PROVIDER:
		case types.SET_TICKET_EXPIRES:
		case types.SET_TICKET_IS_LOADING:
		case types.SET_TICKET_HAS_BEEN_CREATED:
		case types.SET_TICKET_HAS_CHANGES:
		case types.REGISTER_TICKET_BLOCK:
		case types.REMOVE_TICKET_BLOCK:
			return {
				...state,
				tickets: tickets( state.tickets, action ),
			};
		default:
			return state;
	}
};
