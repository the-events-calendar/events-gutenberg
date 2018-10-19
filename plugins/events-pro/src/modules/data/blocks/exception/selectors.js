/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { constants } from '@moderntribe/common/data/plugins';

export const getExceptions = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].blocks.exception;
export const getIndex = ( _, props ) => props.index;

export const getException = createSelector(
	[ getExceptions, getIndex ],
	( exception, index ) => exception[ index ],
);

export const getType = createSelector(
	[ getException ],
	( exception ) => exception.type,
);

export const getDate = createSelector(
	[ getException ],
	( exception ) => exception.date,
);

export const getBetween = createSelector(
	[ getException ],
	( exception ) => exception.between,
);

export const getLimitType = createSelector(
	[ getException ],
	( exception ) => exception.limit_type,
);

export const getLimit = createSelector(
	[ getException ],
	( exception ) => exception.limit,
);

export const getDays = createSelector(
	[ getException ],
	( exception ) => exception.days,
);

export const getWeek = createSelector(
	[ getException ],
	( exception ) => exception.week,
);

export const getDay = createSelector(
	[ getException ],
	( exception ) => exception.day,
);

export const getMonth = createSelector(
	[ getException ],
	( exception ) => exception.month,
);
