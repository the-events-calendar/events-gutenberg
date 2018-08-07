/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import moment from 'moment/moment';

/**
 * Internal dependencies
 */
import { HALF_HOUR_IN_SECONDS } from '@moderntribe/events/editor/utils/time';
import { FORMATS } from '@moderntribe/events/editor/utils/date';
import { roundTime, toDateTime } from '@moderntribe/events/editor/utils/moment';
import { getSetting } from '@moderntribe/events/editor/settings';
import * as types from './types';

export const DEFAULT_STATE = {
	start: toDateTime( roundTime( moment() ) ),
	end: toDateTime( roundTime( moment() ).add( HALF_HOUR_IN_SECONDS, 'seconds' ) ),
	dateTimeSeparator: getSetting( 'dateTimeSeparator', __( '@', 'events-gutenberg' ) ),
	timeRangeSeparator: getSetting( 'timeRangeSeparator', __( '-', 'events-gutenberg' ) ),
	allDay: false,
	multiDay: false,
	timezone: FORMATS.TIMEZONE.string,
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_START_DATE_TIME:
			return {
				...state,
				start: action.payload.start,
			};
		case types.SET_END_DATE_TIME:
			return {
				...state,
				end: action.payload.end,
			};
		case types.SET_ALL_DAY:
			return {
				...state,
				allDay: action.payload.allDay,
			};
		case types.SET_MULTI_DAY:
			return {
				...state,
				multiDay: action.payload.multiDay,
			};
		case types.TOGGLE_MULTI_DAY:
			return {
				...state,
				multiDay: ! state.multiDay,
			};
		case types.SET_SEPARATOR_DATE:
			return {
				...state,
				dateTimeSeparator: action.payload.separator,
			};
		case types.SET_SEPARATOR_TIME:
			return {
				...state,
				timeRangeSeparator: action.payload.separator,
			};
		case types.SET_TIME_ZONE:
			return {
				...state,
				timezone: action.payload.timezone,
			};
		default:
			return state;
	}
};
