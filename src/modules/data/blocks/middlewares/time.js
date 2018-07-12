/**
 * Internal dependencies
 */
import { types, selectors, actions } from 'data/blocks/datetime';

import {
	setTimeInSeconds,
	toDateTime,
	toMoment,
} from 'editor/utils/moment';

const {
	setStart,
	setEnd,
	setAllDay,
} = actions;

import { HOUR_IN_SECONDS } from 'editor/utils/time';

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

	// Reset all day if that's the case.
	if ( isAllDay ) {
		dispatch( setAllDay( false ) );
	}

	const start = setTimeInSeconds( toMoment( current.start ), seconds );
	const end = toMoment( current.end );

	dispatch( setStart( toDateTime( start ) ) );

	if ( start.isSameOrAfter( end ) ) {
		const total = end.clone().add( HOUR_IN_SECONDS, 'seconds' );
		dispatch( setEnd( toDateTime( total ) ) );
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

	const end = setTimeInSeconds( toMoment( current.end ), seconds );
	const start = toMoment( current.start );

	dispatch( setEnd( toDateTime( end ) ) );

	if ( end.isSameOrBefore( start ) ) {
		const total = start.clone().subtract( HOUR_IN_SECONDS, 'seconds' );
		dispatch( setStart( toDateTime( total ) ) );
	}
};
