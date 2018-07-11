/**
 * Internal dependencies
 */
import { types, selectors, actions } from 'data/blocks/datetime';

import {
	isSameDay,
	roundTime,
	setTimeInSeconds,
	toDateTime,
	toMoment,
	totalSeconds,
} from 'editor/utils/moment';

const {
	setStart,
	setEnd,
	setAllDay,
	setMultiDay,
	setEndTime,
} = actions;

import { DAY_IN_SECONDS, HALF_HOUR_IN_SECONDS, MINUTE_IN_SECONDS } from 'editor/utils/time';

export const startTime = ( { dispatch, getState } ) => ( next ) => ( action ) => {
	next( action );

	if ( action.type !== types.SET_START_TIME ) {
		return;
	}

	const { meta = {} } = action;
	const { seconds = 0 } = meta;
	const state = getState();
	const isAllDay = selectors.getAllDay( state );
	const current = {
		start: selectors.getStart( state ),
		end: selectors.getEnd( state ),
	};

	const start = setTimeInSeconds( toMoment( current.start ), seconds );
	dispatch( setStart( toDateTime( start ) ) );

	// Reset all day if that's the case.
	if ( isAllDay ) {
		dispatch( setAllDay( false ) );
		const difference = DAY_IN_SECONDS - totalSeconds( toMoment( current.end ) );
		if ( difference <= MINUTE_IN_SECONDS ) {
			// Prevent to have 11:59 as end time when moving from all day to regular day
			const total = totalSeconds( roundTime( toMoment( current.end ) ) );
			// If the user select start at 11:30pm is going to be the same as end so we need to add half an hour
			dispatch( setEndTime( total ) );
		}
	} else if ( start.isSameOrAfter( toMoment( current.end ) ) ) {
		const total = totalSeconds( start.clone().add( HALF_HOUR_IN_SECONDS, 'seconds' ) );
		dispatch( setEndTime( total ) );
	}
};

export const endTime = ( { dispatch, getState } ) => ( next ) => ( action ) => {
	next( action );

	if ( action.type !== types.SET_END_TIME ) {
		return;
	}

	const { meta = {} } = action;
	const { seconds = 0 } = meta;
	const state = getState();
	const current = {
		start: selectors.getStart( state ),
		end: selectors.getEnd( state ),
	};

	// Reset all day if that's the case.
	const isAllDay = selectors.getAllDay( state );
	if ( isAllDay ) {
		dispatch( setAllDay( false ) );
	}

	let end = setTimeInSeconds( toMoment( current.end ), seconds );
	const start = toMoment( current.start );
	// Add HAlf an hour to the end if is the same or before the start.
	if ( end.isSameOrBefore( start ) ) {
		end = start.clone().add( HALF_HOUR_IN_SECONDS, 'seconds' );
	}
	dispatch( setEnd( toDateTime( end ) ) );

	if ( ! isSameDay( start, end ) ) {
		dispatch( setMultiDay( true ) );
	}
};
