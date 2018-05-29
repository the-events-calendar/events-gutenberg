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
	toMoment,
} from 'utils/moment';

import {
	HALF_HOUR_IN_SECONDS,
	DAY_IN_SECONDS,
} from 'utils/time';

import { isTruthy } from 'utils/string';

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
	const start = toMoment( startDate );
	const state = {
		multiDay,
		startDate,
		endDate,
	};

	const sameDay = isSameDay( start, toMoment( endDate ) );
	if ( ! sameDay ) {
		const lastBlockOfTheDay = DAY_IN_SECONDS - HALF_HOUR_IN_SECONDS;
		// Make sure we don't overflow if start is on the last block of the day which is 11:30
		// As if we just add 30 more minutes we are going to overflow again.
		if ( totalSeconds( start ) === lastBlockOfTheDay ) {
			state.startDate = toDateTime( start.subtract( HALF_HOUR_IN_SECONDS, 'seconds' ) );
		}
		state.endDate = toDateTime(
			toMoment( state.startDate ).add( HALF_HOUR_IN_SECONDS, 'seconds' ),
		);
	}

	state.allDay = isAllDay( toMoment( state.startDate ), toMoment( state.endDate ) );

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
	const start = setTimeInSeconds( toMoment( startDate ), seconds );
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
	const end = setTimeInSeconds( toMoment( startDate ), seconds );
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
	let start = toMoment( startDate );
	let end = toMoment( endDate );

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
		toMoment( startDate ),
		roundTime( toMoment( date ) ),
	);

	return setStartDate( prevState, toDateTime( start ) );
}

export function setOnlyDateForEnd( prevState, date ) {
	if ( ! date ) {
		return prevState;
	}

	const { endDate } = prevState;
	const end = replaceDate(
		toMoment( endDate ),
		roundTime( toMoment( date ) ),
	);

	return setEndDate( prevState, toDateTime( end ) );
}

export function setStartDate( prevState, date ) {
	const { endDate } = prevState;
	const state = {
		startDate: roundTime( toMoment( date ) ),
		endDate: roundTime( toMoment( endDate ) ),
	};

	const start = roundTime( toMoment( date ) );
	if ( state.endDate.isSameOrBefore( start ) ) {
		state.endDate = start.add( HALF_HOUR_IN_SECONDS, 'seconds' );
	}

	return {
		...prevState,
		...adjustEventPropertiesFromMoment( state ),
	};
}

function isAllDay( startDate, endDate ) {
	const sameDay = isSameDay( toMoment( startDate ), toMoment( endDate ) );

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
		startDate: roundTime( toMoment( startDate ) ),
		endDate: roundTime( toMoment( date ) ),
	};

	if ( state.endDate.isBefore( state.startDate ) ) {
		// Swap dates if end date is before start date
		const [ end, start ] = [ state.startDate, state.endDate ];
		state.startDate = start;
		state.endDate = end;
	}

	if ( state.endDate.isSame( state.startDate ) ) {
		state.endDate = toMoment( state.startDate ).add( HALF_HOUR_IN_SECONDS, 'seconds' );
	}

	return {
		...prevState,
		...adjustEventPropertiesFromMoment( state ),
	};
}

function adjustEventPropertiesFromMoment( state ) {
	return {
		...state,
		multiDay: ! isSameDay( state.endDate, state.startDate ),
		allDay: isAllDay( state.startDate, state.endDate ),
		startDate: toDateTime( state.startDate ),
		endDate: toDateTime( state.endDate ),
	};
}

function getAllDayDates( prevState ) {
	const { startDate } = prevState;
	const start = setTimeInSeconds( toMoment( startDate ), 0 );
	const end = toMoment( startDate ).endOf( 'day' );
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
	const start = toMoment( startDate );
	const state = {
		...prevState,
		multiDay: true,
		allDay: false,
		startDate,
		endDate,
	};

	if ( isSameDay( start, toMoment( state.endDate ) ) ) {
		// Add 3 days if we are going to set a dynamic range when start and end are on the same day
		const range = DAY_IN_SECONDS * 3;
		state.endDate = toDateTime(
			toMoment( startDate ).add( range, 'seconds' ),
		);
	}

	return state;
}

export function setOrganizers( prevState, organizer ) {
	return {
		...prevState,
		eventOrganizers: organizer,
	}
}

export function addOrganizers( prevState, organizer ) {
	const { eventOrganizers } = prevState;
	return {
		...prevState,
		eventOrganizers: [ ...eventOrganizers, organizer ],
	};
}

export function setCurrencySymbol( prevState, symbol ) {
	return {
		...prevState,
		eventCurrencySymbol: symbol,
	};
}

export function setCurrencyPosition( prevState, hasPosition ) {
	const position = isTruthy( hasPosition ) ? 'suffix' : 'prefix';
	return {
		...prevState,
		setCurrencyPosition: position,
	};
}

export function setWebsiteUrl( prevState, url ) {
	return {
		...prevState,
		eventUrl: url,
	};
}