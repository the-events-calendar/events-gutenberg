/**
 * External Dependencies
 */
import moment from 'moment/moment';

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

export const DEFAULT_STATE = {
	multiDay: false,
	allDay: false,
	startDate: toDateTime( roundTime( moment() ) ),
	endDate: toDateTime( roundTime( moment() ).add( HALF_HOUR_IN_SECONDS, 'seconds' ) ),
	timezone: 'UTC',
};

export const STORE_NAME = 'tec.details';

const details = {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
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

			case 'SET_INITIAL_STATE': {
				return reducers.setInitialState( state, action.values );
			}
		}
	},
};

export const store = registerStore( STORE_NAME, details );
