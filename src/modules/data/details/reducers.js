/**
 * External dependencies
 */
import moment from 'moment/moment';

/**
 * Internal dependencies
 */
import {
	toDateTime,
	roundTime,
	isSameDay,
	setTimeInSeconds,
	totalSeconds,
	replaceDate,
} from 'utils/moment';

import {
	HALF_HOUR_IN_SECONDS,
	DAY_IN_SECONDS,
} from 'utils/time';

/**
 * Set the event to be a multi day event
 *
 * @param {object} prevState Previous state
 * @param {boolean} multiDay If is multiday or not.
 * @returns {object} new state object
 */
export function setMultiDay( prevState, multiDay ) {
	const { startDate, endDate } = prevState;

	if ( multiDay ) {
		return getMultiDayDates( prevState );
	}

	/**
	 * If we are no longer on a range and start and end are not on the same day move back the dates
	 * to the same day using the start date as the rule to determine the dates.
	 *
	 * after this point we can assure we are setting multiday to off
	 */
	const start = moment( startDate );
	const state = {
		multiDay,
		startDate,
		endDate,
	};

	const sameDay = isSameDay( start, endDate );
	if ( ! sameDay ) {
		const lastBlockOfTheDay = DAY_IN_SECONDS - HALF_HOUR_IN_SECONDS;
		// Make sure we don't overflow if start is on the last block of the day which is 11:30
		// As if we just add 30 more minutes we are going to overflow again.
		if ( totalSeconds( start ) === lastBlockOfTheDay ) {
			state.startDate = toDateTime( start.subtract( HALF_HOUR_IN_SECONDS, 'seconds' ) );
		}
		state.endDate = toDateTime(
			moment( state.startDate ).add( HALF_HOUR_IN_SECONDS, 'seconds' ),
		);
	}

	state.allDay = isAllDay( moment( state.startDate ), moment( state.endDate ) );

	return {
		...prevState,
		...state,
	};
}

/**
 * Set the event to be an All Day event
 *
 * @param {object} prevState Previous state
 * @param {boolean} allDay If the event should be all day
 * @returns {object} new state object
 */
export function setAllDay( prevState, allDay ) {
	if ( allDay ) {
		return getAllDayDates( prevState );
	}

	const { startDate } = prevState;
	return setStartDate( prevState, startDate );
}

/**
 * Change the time of the start date based on an amount of seconds
 *
 * @param {object} prevState Previous state
 * @param {number} seconds Total of seconds to set the start day
 * @returns {object} new state object
 */
export function setStartTime( prevState, seconds ) {
	const { allDay } = prevState;
	if ( allDay ) {
		return getAllDayDates( prevState );
	}

	const { startDate } = prevState;
	const start = setTimeInSeconds( moment( startDate ), seconds );
	return setStartDate( prevState, toDateTime( start ) );
}

/**
 * Change the time of the end date based on an amount of seconds
 *
 * @param {object} prevState Previous state
 * @param {number} seconds Total of seconds to be set the end date
 * @returns {object} new state object
 */
export function setEndTime( prevState, seconds ) {
	const { allDay } = prevState;
	if ( allDay ) {
		return getAllDayDates( prevState );
	}

	const { startDate } = prevState;
	const end = setTimeInSeconds( moment( startDate ), seconds );
	return setEndDate( prevState, toDateTime( end ) );
}

export function setInitialState( prevState, values ) {
	const state = setInitialDates( values, values.startDate, values.endDate );

	return {
		...prevState,
		...state,
	};
}

export function setInitialDates( prevState = {}, startDate = '', endDate = '' ) {
	let start = moment( startDate );
	let end = moment( endDate );

	if ( ! start.isValid() ) {
		start = roundTime( moment() );
	}

	if ( ! end.isValid() ) {
		end = roundTime( moment() );
	}

	const state = {
		...prevState,
		endDate: toDateTime( end ),
	};
	return state.allDay ? state : setStartDate( state, toDateTime( start ) );
}

export function setOnlyDateForStart( prevState, date ) {
	if ( ! date ) {
		return prevState;
	}

	const { startDate } = prevState;
	const start = replaceDate(
		moment( startDate ),
		roundTime( moment( date ) ),
	);

	return setStartDate( prevState, toDateTime( start ) );
}

export function setOnlyDateForEnd( prevState, date ) {
	if ( ! date ) {
		return prevState;
	}

	const { endDate } = prevState;
	const end = replaceDate(
		moment( endDate ),
		roundTime( moment( date ) ),
	);

	return setEndDate( prevState, toDateTime( end ) );
}

export function setStartDate( prevState, date ) {
	const { endDate } = prevState;
	const state = {
		startDate: roundTime( moment( date ) ),
		endDate: roundTime( moment( endDate ) ),
	};

	const start = roundTime( moment( date ) );
	if ( state.endDate.isSameOrBefore( start ) ) {
		state.endDate = start.add( HALF_HOUR_IN_SECONDS, 'seconds' );
	}

	state.multiDay = ! isSameDay( state.startDate, state.endDate );
	state.allDay = isAllDay( state.startDate, state.endDate );
	state.startDate = toDateTime( state.startDate );
	state.endDate = toDateTime( state.endDate );

	return {
		...prevState,
		...state,
	};
}

function isAllDay( startDate, endDate ) {
	const sameDay = isSameDay( startDate, endDate );

	if ( ! sameDay ) {
		return false;
	}

	const isStartOfTheDay = totalSeconds( startDate ) === 0;
	const isEndOfTheDay = totalSeconds( endDate ) === ( DAY_IN_SECONDS - 1 );
	return isStartOfTheDay && isEndOfTheDay;
}

function setEndDate( prevState, date ) {
	const { startDate } = prevState;
	const state = {
		endDate: roundTime( moment( date ) ),
		startDate: roundTime( moment( startDate ) ),
	};

	const now = roundTime( moment() );
	if ( state.endDate.isSameOrBefore( state.startDate ) ) {
		// Remove 30 minutes from the start date if  End Date is lower or equal than Start date
		state.startDate = moment( startDate ).subtract( HALF_HOUR_IN_SECONDS, 'seconds' );

		// New start date does not fit on the bounds
		if ( state.startDate.isSameOrBefore( now ) ) {
			state.startDate = now;
			state.endDate = roundTime( moment() ).add( HALF_HOUR_IN_SECONDS, 'seconds' );
		}
	}

	state.multiDay = ! isSameDay( state.endDate, state.startDate );
	state.allDay = isAllDay( state.startDate, state.endDate );
	state.startDate = toDateTime( state.startDate );
	state.endDate = toDateTime( state.endDate );

	return {
		...prevState,
		...state,
	};
}

function getAllDayDates( prevState ) {
	const { startDate } = prevState;
	const start = setTimeInSeconds( moment( startDate ), 0 );
	const end = moment( startDate ).endOf( 'day' );
	const state = {
		startDate: toDateTime( start ),
		allDay: true,
		multiDay: false,
		endDate: toDateTime( end ),
	};

	return {
		...prevState,
		...state,
	};
}

function getMultiDayDates( prevState ) {
	const { startDate, endDate } = prevState;
	const start = moment( startDate );
	const state = {
		...prevState,
		multiDay: true,
		allDay: false,
		startDate,
		endDate,
	};

	if ( isSameDay( start, state.endDate ) ) {
		// Add 3 days if we are going to set a dynamic range when start and end are on the same day
		const range = DAY_IN_SECONDS * 3;
		state.endDate = toDateTime(
			moment( startDate ).add( range, 'seconds' ),
		);
	}

	return state;
}
