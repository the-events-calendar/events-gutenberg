/**
 * Internal dependencies
 */
import * as types from './types';
import { toMoment } from 'editor/utils/moment';

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

export const setVisibleMonth = ( visibleMonth ) => ( {
	type: types.SET_VISIBLE_MONTH,
	payload: {
		visibleMonth,
	},
} );

export const setInitialState = ( { get } ) => ( dispatch ) => {
	const start = get( 'start' );
	if ( ! start ) {
		return;
	}
	const month = toMoment( start ).startOf( 'month' ).toDate();
	dispatch( setVisibleMonth( month ) );
};
