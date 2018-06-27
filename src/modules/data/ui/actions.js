/**
 * Internal dependencies
 */
import * as types from './types';

export const toggleDashboard = () => ( {
	type: types.TOGGLE_DASHBOARD_DATE_TIME,
} );

export const openDashboard = () => ( {
	type: types.SET_DASHBOARD_DATE_TIME,
	payload: {
		open: true,
	},
} );

export const closeDashboard = () => ( {
	type: types.SET_DASHBOARD_DATE_TIME,
	payload: {
		open: false,
	},
} );
