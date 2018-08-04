/**
 * Internal dependencies
 */
import {
	types,
	actions,
	selectors, selectors as dateTimeSelectors,
} from '@@plugins/events/data/blocks/datetime';

import {
	setTimeInSeconds,
	toDateTime,
	toMoment,
} from '@@plugins/events/editor/utils/moment';

const {
	setStart,
	setEnd,
	setMultiDay,
} = actions;

export default ( { dispatch, getState } ) => ( next ) => ( action ) => {
	next( action );

	if ( action.type !== types.SET_ALL_DAY ) {
		return;
	}

	const state = getState();
	const isAllDay = dateTimeSelectors.getAllDay( state );

	if ( ! isAllDay ) {
		return;
	}

	const current = {
		start: selectors.getStart( state ),
	};

	const start = setTimeInSeconds( toMoment( current.start ), 0 );
	dispatch( setStart( toDateTime( start ) ) );

	const end = toMoment( current.start ).endOf( 'day' );
	dispatch( setEnd( toDateTime( end ) ) );

	dispatch( setMultiDay( false ) );
};
