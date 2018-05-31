/**
 * External Dependencies
 */
import moment from 'moment/moment';
import { __ } from '@wordpress/i18n';

/**
 * Wordpress dependencies
 */
const { data } = wp;
const { registerStore } = data;

/**
 * Internal dependencies
 */
import { roundTime, toDateTime } from 'utils/moment';
import { HALF_HOUR_IN_SECONDS } from 'utils/time';

import * as reducers from './reducers';
import { getSetting } from 'editor/settings';
import { isTruthy } from 'utils/string';

export const DEFAULT_STATE = {
	multiDay: false,
	allDay: false,
	startDate: toDateTime( roundTime( moment() ) ),
	endDate: toDateTime( roundTime( moment() ).add( HALF_HOUR_IN_SECONDS, 'seconds' ) ),
	timezone: 'UTC',
	dateTimeRangeSeparator: getSetting( 'dateTimeSeparator', __( ' @ ', 'events-gutenberg' ) ),
	timeRangeSeparator: getSetting( 'timeRangeSeparator', __( ' - ', 'events-gutenberg' ) ),
	currencyPosition: isTruthy( getSetting( 'reverseCurrencyPosition', 0 ) ) ? 'suffix' : 'prefix',
	eventCurrencySymbol: getSetting( 'defaultCurrencySymbol', __( '$', 'events-gutenberg' ) ),
	eventOrganizers: [],
	eventUrl: undefined,
};

export const STORE_NAME = 'tec.details';

const details = {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_INITIAL_STATE': {
				return reducers.setInitialState( state, action.values );
			}

			case 'SET_MULTI_DAY': {
				return reducers.setMultiDay( state, action.multiDay );
			}

			case 'SET_ALL_DAY': {
				return reducers.setAllDay( state, action.allDay );
			}

			case 'SET_TIME_ZONE': {
				return {
					...state,
					timezone: action.timezone,
				};
			}

			case 'SET_START_DATE': {
				return reducers.setOnlyDateForStart( state, action.date );
			}

			case 'SET_END_DATE': {
				return reducers.setOnlyDateForEnd( state, action.date );
			}

			case 'SET_START_TIME': {
				return reducers.setStartTime( state, action.seconds );
			}

			case 'SET_END_TIME': {
				return reducers.setEndTime( state, action.seconds );
			}

			case 'SET_ORGANIZERS': {
				return reducers.setOrganizers( state, action.organizers );
			}

			case 'ADD_ORGANIZERS': {
				return reducers.addOrganizers( state, action.organizers );
			}

			case 'SET_CURRENCY_SYMBOL': {
				return reducers.setCurrencySymbol( state, action.symbol );
			}

			case 'SET_CURRENCY_POSITION': {
				return reducers.setCurrencyPosition( state, action.position );
			}

			case 'SET_WEBSITE_URL': {
				return reducers.setWebsiteUrl( state, action.eventUrl );
			}

			case 'SET_DATE_TIME_SEPARATOR': {
				return {
					...state,
					dateTimeRangeSeparator: action.separator,
				};
			}

			case 'SET_TIME_RANGE_SEPARATOR': {
				return {
					...state,
					timeRangeSeparator: action.separator,
				};
			}

			default: {
				return state;
			}
		}
	},
};

export const store = registerStore( STORE_NAME, details );
