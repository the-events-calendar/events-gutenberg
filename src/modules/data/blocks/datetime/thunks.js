/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import {
	setStart,
	setEnd,
	setAllDay,
	setMultiDay,
	setSeparatorDate,
	setSeparatorTime,
	setTimeZone,
} from './actions';
import { DEFAULT_STATE } from './reducers';
import { maybeBulkDispatch } from 'data/utils';
import {
	isSameDay,
	parseFormats,
	replaceDate,
	setTimeInSeconds,
	toDateTime,
	toMoment,
} from 'utils/moment';
import { HOUR_IN_SECONDS, DAY_IN_SECONDS } from 'utils/time';

export const setStartTime = ( { start, end, seconds, isAllDay } ) => ( dispatch ) => {
	const startDateTime = toDateTime( setTimeInSeconds( toMoment( start ), seconds ) );

	if ( isAllDay ) {
		const endDateTime = toDateTime( setTimeInSeconds( toMoment( end ), DAY_IN_SECONDS - 1 ) );
		dispatch( setEnd( endDateTime ) );
	}

	dispatch( setStart( startDateTime ) );
	dispatch( setAllDay( isAllDay ) );
};

export const setEndTime = ( { start, end, seconds, isAllDay } ) => ( dispatch ) => {
	const endDateTime = toDateTime( setTimeInSeconds( toMoment( end ), seconds ) );

	if ( isAllDay ) {
		const startDateTime = toDateTime( setTimeInSeconds( toMoment( start ), 0 ) );
		dispatch( setStart( startDateTime ) );
	}

	dispatch( setEnd( endDateTime ) );
	dispatch( setAllDay( isAllDay ) );
};

export const setDates = ( { start, end, from, to } ) => ( dispatch ) => {
	const startMoment = toMoment( start );
	const endMoment = toMoment( end );

	let newStartMoment = replaceDate( startMoment, toMoment( from ) );
	let newEndMoment = replaceDate( endMoment, toMoment( to || from ) );

	if ( newEndMoment.isSameOrBefore( newStartMoment ) ) {
		( { startMoment: newStartMoment, endMoment: newEndMoment } = resetTimes( newStartMoment ) );
	}

	dispatch( setStart( toDateTime( newStartMoment ) ) );
	dispatch( setEnd( toDateTime( newEndMoment ) ) );
};

export const setMultiDayThunk = ( { start, end, checked } ) => ( dispatch ) => {
	if ( checked ) {
		const RANGE_DAYS = applyFilters( 'tec.datetime.defaultRange', 3 );
		const endMoment = toMoment( end ).clone().add( RANGE_DAYS, 'days' );
		dispatch( setEnd( toDateTime( endMoment ) ) );
	} else {
		let startMoment = toMoment( start );
		let endMoment = replaceDate( toMoment( end ), startMoment );

		if ( endMoment.isSameOrBefore( startMoment ) ) {
			( { startMoment, endMoment } = resetTimes( startMoment ) );
		}

		dispatch( setStart( toDateTime( startMoment ) ) );
		dispatch( setEnd( toDateTime( endMoment ) ) );
	}

	dispatch( setMultiDay( checked ) );
};

const resetTimes = ( startMoment ) => {
	const testMoment = startMoment.clone().add( HOUR_IN_SECONDS, 'seconds' );

	// Rollback half an hour before adding half an hour as we are on the edge of the day
	if ( ! isSameDay( startMoment, testMoment ) ) {
		startMoment.subtract( HOUR_IN_SECONDS, 'seconds' );
	}

	const endMoment = startMoment.clone().add( HOUR_IN_SECONDS, 'seconds' );

	return {
		startMoment,
		endMoment,
	};
};

export const setInitialState = ( { get, attributes } ) => ( dispatch ) => {
	const start = get( 'start', DEFAULT_STATE.start );
	const end = get( 'end', DEFAULT_STATE.end );

	maybeBulkDispatch( attributes, dispatch )( [
		[ setStart, 'start', DEFAULT_STATE.start ],
		[ setEnd, 'end', DEFAULT_STATE.end ],
		[ setAllDay, 'allDay', DEFAULT_STATE.allDay ],
		[ setSeparatorDate, 'separatorDate', DEFAULT_STATE.dateTimeSeparator ],
		[ setSeparatorTime, 'separatorTime', DEFAULT_STATE.timeRangeSeparator ],
		[ setTimeZone, 'timezone', DEFAULT_STATE.timezone ],
	] );

	if ( attributes.start ) {
		dispatch( setStart( toDateTime( parseFormats( attributes.start ) ) ) );
	}

	if ( attributes.end ) {
		dispatch( setEnd( toDateTime( parseFormats( attributes.end ) ) ) );
	}

	// sameDay
	const current = {
		start: toMoment( start ),
		end: toMoment( end ),
	};
	dispatch( setMultiDay( ! isSameDay( current.start, current.end ) ) );
};
