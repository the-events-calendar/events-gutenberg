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
	setAllDay as setAllDayAction,
	setMultiDay as setMultiDayAction,
	setSeparatorDate,
	setSeparatorTime,
	setTimeZone,
	setTimeZoneLabel,
	setTimeZoneVisibility,
	setNaturalLanguageLabel,
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
	adjustStart,
	toDate,
} from 'utils/moment';
import { DAY_IN_SECONDS } from 'utils/time';
import { rangeToNaturalLanguage } from 'editor/utils';

export const setStartTime = ( { start, seconds } ) => ( dispatch ) => {
	const startDateTime = toDateTime( setTimeInSeconds( toMoment( start ), seconds ) );
	dispatch( setStart( startDateTime ) );
};

export const setEndTime = ( { end, seconds } ) => ( dispatch ) => {
	const endDateTime = toDateTime( setTimeInSeconds( toMoment( end ), seconds ) );
	dispatch( setEnd( endDateTime ) );
};

export const setAllDay = ( { start, end, isAllDay } ) => ( dispatch ) => {
	if ( isAllDay ) {
		const startDateTime = toDateTime( setTimeInSeconds( toMoment( start ), 0 ) );
		const endDateTime = toDateTime( setTimeInSeconds( toMoment( end ), DAY_IN_SECONDS - 1 ) );
		dispatch( setStart( startDateTime ) );
		dispatch( setEnd( endDateTime ) );
	}

	dispatch( setAllDayAction( isAllDay ) );
}

export const setDates = ( { start, end, from, to } ) => ( dispatch ) => {
	const startMoment = toMoment( start );
	const endMoment = toMoment( end );

	const result = adjustStart(
		replaceDate( startMoment, toMoment( from ) ),
		replaceDate( endMoment, toMoment( to || from ) ),
	)

	dispatch( setStart( toDateTime( result.start ) ) );
	dispatch( setEnd( toDateTime( result.end ) ) );
};

export const setDateTime = ( { start, end } ) => ( dispatch ) => {
	const result = adjustStart(
		toMoment( start ),
		toMoment( end || start ),
	)

	const isMultiDay = ! isSameDay( result.start, result.end );
	dispatch( setStart( toDateTime( result.start ) ) );
	dispatch( setEnd( toDateTime( result.end ) ) );
	dispatch( setMultiDayAction( isMultiDay ) );
}

export const setMultiDay = ( { start, end, isMultiDay } ) => ( dispatch ) => {
	if ( isMultiDay ) {
		const RANGE_DAYS = applyFilters( 'tec.datetime.defaultRange', 3 );
		const endMoment = toMoment( end ).clone().add( RANGE_DAYS, 'days' );
		dispatch( setEnd( toDateTime( endMoment ) ) );
	} else {
		const startMoment = toMoment( start );
		const result = adjustStart(
			startMoment,
			replaceDate( toMoment( end ), startMoment ),
		);

		dispatch( setStart( toDateTime( result.start ) ) );
		dispatch( setEnd( toDateTime( result.end ) ) );
	}

	dispatch( setMultiDayAction( isMultiDay ) );
};

export const setInitialState = ( { attributes } ) => ( dispatch ) => {
	maybeBulkDispatch( attributes, dispatch )( [
		[ setStart, 'start', DEFAULT_STATE.start ],
		[ setEnd, 'end', DEFAULT_STATE.end ],
		[ setAllDayAction, 'allDay', DEFAULT_STATE.allDay ],
		[ setSeparatorDate, 'separatorDate', DEFAULT_STATE.dateTimeSeparator ],
		[ setSeparatorTime, 'separatorTime', DEFAULT_STATE.timeRangeSeparator ],
		[ setTimeZone, 'timeZone', DEFAULT_STATE.timeZone ],
		[ setTimeZoneLabel, 'timeZoneLabel', DEFAULT_STATE.timeZoneLabel ],
		[ setTimeZoneVisibility, 'showTimeZone', DEFAULT_STATE.showTimeZone ],
	] );

	const values = {
		start: DEFAULT_STATE.start,
		end: DEFAULT_STATE.end,
	};

	if ( attributes.start ) {
		values.start = toDateTime( parseFormats( attributes.start ) );
		dispatch( setStart( values.start ) );
	}

	if ( attributes.end ) {
		values.end = toDateTime( parseFormats( attributes.end ) );
		dispatch( setEnd( values.end ) );
	}

	dispatch( setNaturalLanguageLabel( rangeToNaturalLanguage( values.start, values.end ) ) );

	dispatch( setMultiDayAction( ! isSameDay( values.start, values.end ) ) );
};
