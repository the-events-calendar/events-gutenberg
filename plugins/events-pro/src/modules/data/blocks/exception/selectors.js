/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import {
	EXCEPTION_OCCURRENCE_OPTIONS,
} from './options';
import { SERIES_ENDS_OPTIONS } from '@moderntribe/events-pro/data/blocks/recurring/options';
import { constants } from '@moderntribe/common/data/plugins';

export const getExceptions = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].blocks.exception;
export const hasExceptions = createSelector( getExceptions, exceptions => !! exceptions.length );
export const getIndex = ( _, props ) => props.index;

export const getRule = createSelector(
	[ getExceptions, getIndex ],
	( exceptions, index ) => exceptions[ index ],
);

export const getType = createSelector(
	[ getRule ],
	( exception ) => exception.type,
);

export const getAllDay = createSelector(
	[ getRule ],
	( exception ) => exception.all_day,
);

export const getMultiDay = createSelector(
	[ getRule ],
	( exception ) => exception.multi_day,
);

export const getStartDate = createSelector(
	[ getRule ],
	( exception ) => exception.start_date,
);

export const getStartTime = createSelector(
	[ getRule ],
	( exception ) => exception.start_time
);

export const getStartTimeNoSeconds = createSelector(
	[ getStartTime ],
	( startTime ) => startTime.slice( 0, -3 ),
);

export const getEndDate = createSelector(
	[ getRule ],
	( exception ) => exception.end_date,
);

export const getEndTime = createSelector(
	[ getRule ],
	( exception ) => exception.end_time
);

export const getEndTimeNoSeconds = createSelector(
	[ getEndTime ],
	( endTime ) => endTime.slice( 0, -3 ),
);

export const getBetween = createSelector(
	[ getRule ],
	( exception ) => exception.between,
);

export const getLimitType = createSelector(
	[ getRule ],
	( exception ) => exception.limit_type,
);

export const getLimit = createSelector(
	[ getRule ],
	( exception ) => exception.limit,
);

export const getDays = createSelector(
	[ getRule ],
	( exception ) => exception.days,
);

export const getWeek = createSelector(
	[ getRule ],
	( exception ) => exception.week,
);

export const getDay = createSelector(
	[ getRule ],
	( exception ) => exception.day,
);

export const getMonth = createSelector(
	[ getRule ],
	( exception ) => exception.month,
);

export const getTimezone = createSelector(
	[ getRule ],
	( exception ) => exception.timezone,
);

export const getTypeOption = createSelector(
	[ getType ],
	( type ) => find( EXCEPTION_OCCURRENCE_OPTIONS, ( option ) => option.value === type )
);

export const getLimitTypeOption = createSelector(
	[ getLimitType ],
	( limitType ) => find( SERIES_ENDS_OPTIONS, ( option ) => option.value === limitType )
);
