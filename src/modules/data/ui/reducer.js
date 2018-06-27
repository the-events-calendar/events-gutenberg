/**
 * Internal dependencies
 */
import * as types from './types';

export const DEFAULT_STATE = {
	dashboardDateTimeOpen: false,
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_DASHBOARD_DATE_TIME:
			return {
				...state,
				dashboardDateTimeOpen: action.payload.open,
			};
		case types.TOGGLE_DASHBOARD_DATE_TIME:
			return {
				...state,
				dashboardDateTimeOpen: ! state.dashboardDateTimeOpen,
			};
		default:
			return state;
	}
};
