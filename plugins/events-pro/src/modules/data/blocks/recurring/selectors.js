/* eslint-disable max-len */

/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import {
	RECURRENCE_TYPE_RULES_OPTIONS,
	SERIES_ENDS_OPTIONS,
} from './options';
import { constants as pluginConstants } from '@moderntribe/common/data/plugins';
import { constants } from '@moderntribe/events-pro/data/blocks';

const {
	KEY_TYPE,
	KEY_ALL_DAY,
	KEY_MULTI_DAY,
	KEY_START_TIME,
	KEY_END_TIME,
	KEY_START_DATE,
	KEY_START_DATE_INPUT,
	KEY_START_DATE_OBJ,
	KEY_END_DATE,
	KEY_END_DATE_INPUT,
	KEY_END_DATE_OBJ,
	KEY_LIMIT,
	KEY_LIMIT_DATE_INPUT,
	KEY_LIMIT_DATE_OBJ,
	KEY_LIMIT_TYPE,
	KEY_BETWEEN,
	KEY_DAYS,
	KEY_WEEK,
	KEY_DAY,
	KEY_MONTH,
	KEY_TIMEZONE,
} = constants;

export const getRules = ( state ) => state[ pluginConstants.EVENTS_PRO_PLUGIN ].blocks.recurring;
export const getIndex = ( _, props ) => props.index;

export const getRule = createSelector(
	[ getRules, getIndex ],
	( rules, index ) => rules[ index ],
);

export const getType = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_TYPE ],
);

export const getAllDay = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_ALL_DAY ],
);

export const getMultiDay = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_MULTI_DAY ],
);

export const getStartDate = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_START_DATE ],
);

export const getStartDateInput = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_START_DATE_INPUT ],
);

export const getStartDateObj = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_START_DATE_OBJ ],
);

export const getStartTime = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_START_TIME ],
);

export const getStartTimeNoSeconds = createSelector(
	[ getStartTime ],
	( startTime ) => startTime.slice( 0, -3 ),
);

export const getEndDate = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_END_DATE ],
);

export const getEndDateInput = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_END_DATE_INPUT ],
);

export const getEndDateObj = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_END_DATE_OBJ ],
);

export const getEndTime = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_END_TIME ],
);

export const getEndTimeNoSeconds = createSelector(
	[ getEndTime ],
	( endTime ) => endTime.slice( 0, -3 ),
);

export const getBetween = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_BETWEEN ],
);

export const getLimitType = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_LIMIT_TYPE ],
);

export const getLimit = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_LIMIT ],
);

export const getLimitDateInput = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_LIMIT_DATE_INPUT ],
);

export const getLimitDateObj = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_LIMIT_DATE_OBJ ],
);

export const getDays = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_DAYS ],
);

export const getWeek = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_WEEK ],
);

export const getDay = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_DAY ],
);

export const getMonth = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_MONTH ],
);

export const getTimezone = createSelector(
	[ getRule ],
	( rule ) => rule[ KEY_TIMEZONE ],
);

export const getTypeOption = createSelector(
	[ getType ],
	( type ) => find( RECURRENCE_TYPE_RULES_OPTIONS, ( option ) => option.value === type ),
);

export const getLimitTypeOption = createSelector(
	[ getLimitType ],
	( limitType ) => find( SERIES_ENDS_OPTIONS, ( option ) => option.value === limitType ),
);
