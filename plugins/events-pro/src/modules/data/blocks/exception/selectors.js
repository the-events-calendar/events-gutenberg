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
import { constants } from '@moderntribe/common/data/plugins';

export const getExceptions = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].blocks.exception;
export const getIndex = ( _, props ) => props.index;

export const getRule = createSelector(
	[ getExceptions, getIndex ],
	( exceptions, index ) => exceptions[ index ],
);

export const getType = createSelector(
	[ getRule ],
	( exception ) => exception.type,
);

export const getDate = createSelector(
	[ getRule ],
	( exception ) => exception.date,
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

export const getTypeOption = createSelector(
	( exception ) => exception,
	( exception ) => find( EXCEPTION_OCCURRENCE_OPTIONS, type => exception && type.value === exception.type )
);
