/* eslint-disable max-len */

/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import * as constants from '@moderntribe/events-pro/data/blocks/constants';

export const getRule = rule => rule;

export const getType = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_TYPE ],
);

export const getAllDay = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_ALL_DAY ],
);

export const getMultiDay = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_MULTI_DAY ],
);

export const getMultiDaySpan = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_MULTI_DAY_SPAN ],
);

export const getStartDate = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_START_DATE ],
);

export const getStartDateInput = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_START_DATE_INPUT ],
);

export const getStartDateObj = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_START_DATE_OBJ ],
);

export const getStartTime = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_START_TIME ],
);

export const getStartTimeNoSeconds = createSelector(
	[ getStartTime ],
	( startTime ) => startTime.slice( 0, -3 ),
);

export const getEndDate = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_END_DATE ],
);

export const getEndDateInput = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_END_DATE_INPUT ],
);

export const getEndDateObj = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_END_DATE_OBJ ],
);

export const getEndTime = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_END_TIME ],
);

export const getEndTimeNoSeconds = createSelector(
	[ getEndTime ],
	( endTime ) => endTime.slice( 0, -3 ),
);

export const getBetween = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_BETWEEN ],
);

export const getLimitType = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_LIMIT_TYPE ],
);

export const getLimit = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_LIMIT ],
);

export const getLimitDateInput = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_LIMIT_DATE_INPUT ],
);

export const getLimitDateObj = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_LIMIT_DATE_OBJ ],
);

export const getDays = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_DAYS ],
);

export const getWeek = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_WEEK ],
);

export const getDay = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_DAY ],
);

export const getMonth = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_MONTH ],
);

export const getTimezone = createSelector(
	[ getRule ],
	( rule ) => rule[ constants.KEY_TIMEZONE ],
);
