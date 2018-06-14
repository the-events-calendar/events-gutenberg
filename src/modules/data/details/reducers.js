/**
 * External dependencies
 */
import moment from 'moment/moment';
import { find, isObject, uniq } from 'lodash';

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

/**
 * Set the event to be a multi day event
 *
 * @param {object} prevState Previous state
 * @param {boolean} multiDay If is multiday or not.
 * @returns {object} new state object
 */
export function setMultiDay( prevState, multiDay ) {
	const { start, end } = prevState;

	if ( multiDay ) {
		return getMultiDayDates( prevState );
	}

	/**
	 * If we are no longer on a range and start and end are not on the same day move back the dates
	 * to the same day using the start date as the rule to determine the dates.
	 *
	 * after this point we can assure we are setting multiday to off
	 */
	const startMoment = toMoment( start );
	const state = {
		multiDay,
		start,
		end,
	};

	const sameDay = isSameDay( startMoment, toMoment( end ) );
	if ( ! sameDay ) {
		const lastBlockOfTheDay = DAY_IN_SECONDS - HALF_HOUR_IN_SECONDS;
		// Make sure we don't overflow if start is on the last block of the day which is 11:30
		// As if we just add 30 more minutes we are going to overflow again.
		if ( totalSeconds( startMoment ) === lastBlockOfTheDay ) {
			state.start = toDateTime( startMoment.subtract( HALF_HOUR_IN_SECONDS, 'seconds' ) );
		}
		state.end = toDateTime(
			toMoment( state.start ).add( HALF_HOUR_IN_SECONDS, 'seconds' ),
		);
	}

	state.allDay = isAllDay( toMoment( state.start ), toMoment( state.end ) );

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

	const { start } = prevState;
	return setStartDate( prevState, start );
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

	const { start } = prevState;
	const startSeconds = setTimeInSeconds( toMoment( start ), seconds );
	return setStartDate( prevState, toDateTime( startSeconds ) );
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

	const { start } = prevState;
	const end = setTimeInSeconds( toMoment( start ), seconds );
	return setEndDate( prevState, toDateTime( end ) );
}

export function setInitialState( prevState, values ) {
	const state = setInitialDates( values, values.start, values.end );

	return {
		...prevState,
		...state,
	};
}

export function setInitialDates( prevState = {}, start = '', end = '' ) {
	let startMoment = toMoment( start );
	let endMoment = toMoment( end );

	if ( ! startMoment.isValid() ) {
		startMoment = roundTime( moment() );
	}

	if ( ! endMoment.isValid() ) {
		endMoment = roundTime( moment() );
	}

	const state = {
		...prevState,
		end: toDateTime( endMoment ),
	};
	return state.allDay ? state : setStartDate( state, toDateTime( startMoment ) );
}

export function setOnlyDateForStart( prevState, date ) {
	if ( ! date ) {
		return prevState;
	}

	const { start } = prevState;
	const startMoment = replaceDate(
		toMoment( start ),
		roundTime( toMoment( date ) ),
	);

	return setStartDate( prevState, toDateTime( startMoment ) );
}

export function setOnlyDateForEnd( prevState, date ) {
	if ( ! date ) {
		return prevState;
	}

	const { end } = prevState;
	const endMoment = replaceDate(
		toMoment( end ),
		roundTime( toMoment( date ) ),
	);

	return setEndDate( prevState, toDateTime( endMoment ) );
}

export function setStartDate( prevState, date ) {
	const { end } = prevState;
	const state = {
		start: roundTime( toMoment( date ) ),
		end: roundTime( toMoment( end ) ),
	};

	const start = roundTime( toMoment( date ) );
	if ( state.end.isSameOrBefore( start ) ) {
		state.end = start.add( HALF_HOUR_IN_SECONDS, 'seconds' );
	}

	return {
		...prevState,
		...adjustEventPropertiesFromMoment( state ),
	};
}

function isAllDay( start, end ) {
	const sameDay = isSameDay( toMoment( start ), toMoment( end ) );

	if ( ! sameDay ) {
		return false;
	}

	const isStartOfTheDay = totalSeconds( start ) === 0;
	const isEndOfTheDay = totalSeconds( end ) === ( DAY_IN_SECONDS - 1 );
	return isStartOfTheDay && isEndOfTheDay;
}

function setEndDate( prevState, date ) {
	const { start } = prevState;
	const state = {
		start: roundTime( toMoment( start ) ),
		end: roundTime( toMoment( date ) ),
	};

	if ( state.end.isBefore( state.start ) ) {
		// Swap dates if end date is before start date
		const [ end, start ] = [ state.start, state.end ];
		state.start = start;
		state.end = end;
	}

	if ( state.end.isSame( state.start ) ) {
		state.end = toMoment( state.start ).add( HALF_HOUR_IN_SECONDS, 'seconds' );
	}

	return {
		...prevState,
		...adjustEventPropertiesFromMoment( state ),
	};
}

function adjustEventPropertiesFromMoment( state ) {
	return {
		...state,
		multiDay: ! isSameDay( state.end, state.start ),
		allDay: isAllDay( state.start, state.end ),
		start: toDateTime( state.start ),
		end: toDateTime( state.end ),
	};
}

function getAllDayDates( prevState ) {
	const { start } = prevState;
	const startSeconds = setTimeInSeconds( toMoment( start ), 0 );
	const end = toMoment( start ).endOf( 'day' );
	const state = {
		start: toDateTime( startSeconds ),
		allDay: true,
		multiDay: false,
		end: toDateTime( end ),
	};

	return {
		...prevState,
		...state,
	};
}

function getMultiDayDates( prevState ) {
	const { start, end } = prevState;
	const startMoment = toMoment( start );
	const state = {
		...prevState,
		multiDay: true,
		allDay: false,
		start,
		end,
	};

	if ( isSameDay( startMoment, toMoment( state.end ) ) ) {
		// Add 3 days if we are going to set a dynamic range when start and end are on the same day
		const range = DAY_IN_SECONDS * 3;
		state.end = toDateTime(
			toMoment( start ).add( range, 'seconds' ),
		);
	}

	return state;
}

export function setOrganizers( prevState, organizer ) {
	return {
		...prevState,
		organizers: organizer,
	};
}

export function addOrganizers( prevState, organizer ) {
	return {
		...prevState,
		organizers: uniq( [ ...prevState.organizers, organizer ] ),
	};
}

export function removeOrganizer( prevState, organizer ) {
	return {
		...prevState,
		organizers: prevState.organizers.filter( ( item ) => item !== organizer ),
	};
}

export function maybeRemoveOrganizer( prevState, organizer ) {
	const { organizers } = prevState;
	const result = find( organizers, ( item ) => {
		const { id, block } = item;
		return block === 'individual' && id === organizer.id;
	} );

	let selectedOrganizers = [ ...organizers ];
	if ( result && result.id ) {
		selectedOrganizers = selectedOrganizers.filter( ( item ) => item.id !== result.id );
	}

	return {
		...prevState,
		organizers: selectedOrganizers,
	};
}

export function replaceOrganizers( prevState, newOrganizers ) {
	const { organizers } = prevState;
	const current = organizers.map( ( item ) => {
		if ( isObject( item ) ) {
			return item;
		}
		const search = newOrganizers.filter( ( organizer ) => organizer.id === item );
		return search.length ? search[ 0 ] : item;
	} );
	return {
		...prevState,
		organizers: current,
	};
}

export function setCurrencySymbol( prevState, symbol ) {
	return {
		...prevState,
		currencySymbol: symbol,
	};
}

export function setCurrencyPosition( prevState, hasPosition ) {
	return {
		...prevState,
		currencyPosition: hasPosition ? 'prefix' : 'suffix',
	};
}

export function setWebsiteUrl( prevState, url ) {
	return {
		...prevState,
		url,
	};
}
