/**
 * Internal dependencies
 */
import {
	toMoment,
	toDateTime,
	replaceDate, isSameDay,
} from 'utils/moment';
import {
	types,
	actions,
	selectors,
} from 'data/blocks/datetime';
import { HOUR_IN_SECONDS } from 'editor/utils/time';

export const dates = ( { dispatch, getState } ) => ( next ) => ( action ) => {
	next( action );

	if ( action.type !== types.SET_DATES ) {
		return;
	}

	const state = getState();
	const { meta = {} } = action;
	const { from, to, withTime = false } = meta;

	const current = {
		start: selectors.getStart( state ),
		end: selectors.getEnd( state ),
	};

	let start = replaceDate( toMoment( current.start ), toMoment( from ) );
	// Use the "to" value and fallback with "from" value
	let end = replaceDate( toMoment( current.end ), toMoment( to || from ) );

	if ( withTime ) {
		start = toMoment( from );
		end = to ? toMoment( to ) : end;
	}

	if ( start.isSameOrAfter( end ) ) {
		end = end.add( HOUR_IN_SECONDS, 'seconds' );
	}

	dispatch( actions.setStart( toDateTime( start ) ) );
	dispatch( actions.setEnd( toDateTime( end ) ) );

	if ( ! isSameDay( start, end ) ) {
		dispatch( actions.setMultiDay( true ) );
	}
};
