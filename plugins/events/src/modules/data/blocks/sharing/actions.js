/**
 * Internal dependencies
 */
import * as types from './types';
import { DEFAULT_STATE } from './reducers';

export const setGoogleCalendarLabel = ( label ) => ( {
	type: types.SET_GOOGLE_CALENDAR_LABEL,
	payload: {
		label,
	},
} );

export const setHasGoogleCalendar = ( hasGoogleCalendar ) => ( {
	type: types.SET_HAS_GOOGLE_CALENDAR,
	payload: {
		hasGoogleCalendar,
	},
} );

export const toggleGoogleCalendar = () => ( { type: types.TOGGLE_GOOGLE_CALENDAR } );

export const setiCalLabel = ( label ) => ( {
	type: types.SET_ICAL_LABEL,
	payload: {
		label,
	},
} );

export const setHasIcal = ( hasiCal ) => ( {
	type: types.SET_HAS_ICAL,
	payload: {
		hasiCal,
	},
} );

export const toggleIcalLabel = () => ( { type: types.TOGGLE_ICAL } );

export const setInitialState = ( { get } ) => ( dispatch ) => {
	dispatch(
		setGoogleCalendarLabel(
			get( 'googleCalendarLabel', DEFAULT_STATE.googleCalendarLabel )
		)
	);
	dispatch( setiCalLabel( get( 'iCalLabel', DEFAULT_STATE.iCalLabel ) ) );
	dispatch( setHasIcal( get( 'hasiCal', DEFAULT_STATE.hasiCal ) ) );
	dispatch( setHasGoogleCalendar( get( 'hasGoogleCalendar', DEFAULT_STATE.hasGoogleCalendar ) ) );
};
