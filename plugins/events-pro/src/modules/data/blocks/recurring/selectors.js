/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { constants } from '@moderntribe/common/data/plugins';

export const getRules = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].blocks.recurring;
export const getIndex = ( _, props ) => props.index;

export const getRule = createSelector(
	[ getRules, getIndex ],
	( rules, index ) => rules[ index ],
);

export const getType = createSelector(
	[ getRule ],
	( rule ) => rule.type,
);

export const getAllDay = createSelector(
	[ getRule ],
	( rule ) => rule.all_day,
);

export const getMultiDay = createSelector(
	[ getRule ],
	( rule ) => rule.multi_day,
);

export const getStartDate = createSelector(
	[ getRule ],
	( rule ) => rule.start_date,
);

export const getStartTime = createSelector(
	[ getRule ],
	( rule ) => rule.start_time,
);

export const getEndDate = createSelector(
	[ getRule ],
	( rule ) => rule.end_date,
);

export const getEndTime = createSelector(
	[ getRule ],
	( rule ) => rule.end_time,
);

export const getBetween = createSelector(
	[ getRule ],
	( rule ) => rule.between,
);

export const getLimitType = createSelector(
	[ getRule ],
	( rule ) => rule.limit_type,
);

export const getLimit = createSelector(
	[ getRule ],
	( rule ) => rule.limit,
);

export const getDays = createSelector(
	[ getRule ],
	( rule ) => rule.days,
);

export const getWeek = createSelector(
	[ getRule ],
	( rule ) => rule.week,
);

export const getDay = createSelector(
	[ getRule ],
	( rule ) => rule.day,
);

export const getMonth = createSelector(
	[ getRule ],
	( rule ) => rule.month,
);

export const getTimezone = createSelector(
	[ getRule ],
	( rule ) => rule.timezone,
);
