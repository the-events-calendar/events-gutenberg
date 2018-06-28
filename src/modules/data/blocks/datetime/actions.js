/**
 * Internal dependencies
 */
import { DEFAULT_STATE } from './reducers';
import { isSameDay, toMoment } from 'editor/utils/moment';
import * as types from './types';

export const setDate = ( from, to ) => ( {
	type: types.SET_DATES,
	meta: {
		from,
		to,
	},
} );

export const setStart = ( start ) => ( {
	type: types.SET_START_DATE_TIME,
	payload: {
		start,
	},
} );

export const setEnd = ( end ) => ( {
	type: types.SET_END_DATE_TIME,
	payload: {
		end,
	},
} );

export const setStartTime = ( seconds ) => ( {
	type: types.SET_START_TIME,
	meta: {
		seconds,
	},
} );

export const setEndTime = ( seconds ) => ( {
	type: types.SET_END_TIME,
	meta: {
		seconds,
	},
} );

export const setSeparatorDate = ( separator ) => ( {
	type: types.SET_SEPARATOR_DATE,
	payload: {
		separator,
	},
} );

export const setSeparatorTime = ( separator ) => ( {
	type: types.SET_SEPARATOR_TIME,
	payload: {
		separator,
	},
} );

export const toggleMultiDay = () => ( { type: types.TOGGLE_MULTI_DAY } );

export const setAllDay = ( allDay ) => ( {
	type: types.SET_ALL_DAY,
	payload: {
		allDay,
	},
} );

export const setMultiDay = ( multiDay ) => ( {
	type: types.SET_MULTI_DAY,
	payload: {
		multiDay,
	},
} );

export const setTimeZone = ( timezone ) => ( {
	type: types.SET_TIME_ZONE,
	payload: {
		timezone,
	},
} );

export const setInitialState = ( attributes = {} ) => {
	return ( dispatch ) => {
		const start = attributes.start || DEFAULT_STATE.start;
		const end = attributes.end || DEFAULT_STATE.end;

		dispatch( setStart( start ) );
		dispatch( setEnd( end ) );
		dispatch( setAllDay( attributes.allDay || DEFAULT_STATE.allDay ) );
		dispatch( setSeparatorDate( attributes.separatorDate || DEFAULT_STATE.date ) );
		dispatch( setSeparatorTime( attributes.separatorTime || DEFAULT_STATE.time ) );
		dispatch( setTimeZone( attributes.timezone || DEFAULT_STATE.timezone ) );
		// sameDay
		const current = {
			start: toMoment( start ),
			end: toMoment( end ),
		};
		dispatch( setMultiDay( ! isSameDay( current.start, current.end ) ) );
	};
};
