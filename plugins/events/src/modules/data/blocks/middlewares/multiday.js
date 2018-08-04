/**
 * External dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import {
	types,
	actions,
	selectors,
} from '@@tribe/events/data/blocks/datetime';

import {
	isSameDay,
	replaceDate,
	toDateTime,
	toMoment,
} from '@@tribe/events/editor/utils/moment';
import { HOUR_IN_SECONDS } from '@@tribe/events/editor/utils/time';

const resetMultiDay = ( current ) => {
	let end = replaceDate( current.end, current.start );
	let start = current.start.clone();

	// Make sure when you come from multiday to a single day times are not at the same time.
	if ( end.isSameOrBefore( start ) ) {
		const future = start.clone();
		future.add( HOUR_IN_SECONDS, 'seconds' );

		// Rollback half an hour before adding half an hour as we are on the edge of the day
		if ( ! isSameDay( current.start, future ) ) {
			start = start.clone();
			start.subtract( HOUR_IN_SECONDS, 'seconds' );
		}

		end = start.clone();
		end.add( HOUR_IN_SECONDS, 'seconds' );
	}

	return {
		end,
		start,
	};
};

const {
	setStart,
	setEnd,
	setAllDay,
} = actions;
const RANGE_DAYS = applyFilters( 'tec.datetime.defaultRange', 3 );

export default ( { dispatch, getState } ) => ( next ) => ( action ) => {
	next( action );

	if ( action.type !== types.TOGGLE_MULTI_DAY ) {
		return;
	}

	const state = getState();
	const current = {
		start: toMoment( selectors.getStart( state ) ),
		end: toMoment( selectors.getEnd( state ) ),
	};

	const isMultiDay = selectors.getMultiDay( state );
	if ( isMultiDay ) {
		// Reset all day if that's the case.
		dispatch( setAllDay( false ) );
		if ( isSameDay( current.start, current.end ) ) {
			const end = current.end.clone().add( RANGE_DAYS, 'days' );
			dispatch( setEnd( toDateTime( end ) ) );
		}
	} else {
		const { start, end } = resetMultiDay( current );
		dispatch( setStart( toDateTime( start ) ) );
		dispatch( setEnd( toDateTime( end ) ) );
	}
};
