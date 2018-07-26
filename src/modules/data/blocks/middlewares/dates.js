/**
 * Internal dependencies
 */
import {
	roundTime,
	toMoment,
	toDateTime,
	replaceDate,
} from 'utils/moment';
import {
	types,
	actions,
	selectors,
} from 'data/blocks/datetime';

export const dates = ( { dispatch, getState } ) => ( next ) => ( action ) => {
	next( action );

	if ( action.type !== types.SET_DATES ) {
		return;
	}

	const state = getState();
	const { meta = {} } = action;
	const { from, to } = meta;

	const current = {
		start: selectors.getStart( state ),
		end: selectors.getEnd( state ),
	};

	const start = replaceDate( toMoment( current.start ), toMoment( from ) );
	dispatch( actions.setStart( toDateTime( start ) ) );

	// Use the "to" value and fallback with "from" value
	const end = replaceDate( toMoment( current.end ), toMoment( to || from ) );
	dispatch( actions.setEnd( toDateTime( end ) ) );
};
