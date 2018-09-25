/**
 * Internal dependencies
 */
import * as types from './../types';
import { TYPES } from '@moderntribe/tickets/blocks/ticket/edit-container/content/capacity/template';

export const DEFAULT_STATE = {
	title: '',
	description: '',
	price: 0,
	SKU: '',
	startDate: null,
	endDate: null,
	startTime: null,
	endTime: null,
	capacityType: TYPES.independent,
	independentCapacity: '',
	sharedCapacity: '',
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_TICKET_TITLE:
			return {
				...state,
				title: action.payload.title,
			};
		case types.SET_TICKET_DESCRIPTION:
			return {
				...state,
				description: action.payload.description,
			};
		case types.SET_TICKET_PRICE:
			return {
				...state,
				price: action.payload.price,
			};
		case types.SET_TICKET_SKU:
			return {
				...state,
				SKU: action.payload.SKU,
			};
		case types.SET_TICKET_START_DATE:
			return {
				...state,
				startDate: action.payload.startDate,
			};
		case types.SET_TICKET_START_TIME:
			return {
				...state,
				startTime: action.payload.startTime,
			};
		case types.SET_TICKET_END_DATE:
			return {
				...state,
				endDate: action.payload.endDate,
			};
		case types.SET_TICKET_END_TIME:
			return {
				...state,
				endTime: action.payload.endTime,
			};
		case types.SET_TICKET_INDEPENDENT_CAPACITY:
			return {
				...state,
				independentCapacity: action.payload.independentCapacity,
			};
		case types.SET_TICKET_SHARED_CAPACITY:
			return {
				...state,
				sharedCapacity: action.payload.sharedCapacity,
			};
		case types.SET_TICKET_CAPACITY_TYPE:
			return {
				...state,
				capacityType: action.payload.capacityType,
			};
		default:
			return state;
	}
};
