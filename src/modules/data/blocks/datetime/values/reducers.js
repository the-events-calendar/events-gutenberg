/**
 * External dependencies
 */
import moment from 'moment/moment';

/**
 * Internal dependencies
 */
import { HALF_HOUR_IN_SECONDS } from 'editor/utils/time';
import { roundTime, toDateTime } from 'editor/utils/moment';

const DEFAULT_STATE = {
	start: toDateTime( roundTime( moment() ) ),
	end: toDateTime( roundTime( moment() ).add( HALF_HOUR_IN_SECONDS, 'seconds' ) ),
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		default:
			return state;
	}
};
