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
import { constants } from '@moderntribe/common/data/plugins';
import * as selectors from '@moderntribe/events-pro/data/shared/selectors';

export const getRules = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].blocks.recurring;
export const getRulesCount = createSelector( getRules, ( rules ) => rules.length );
export const hasRules = createSelector( getRulesCount, ( count ) => !! count );
export const getIndex = ( _, props ) => props.index;

export const getRule = createSelector(
	[ getRules, getIndex ],
	( rules, index ) => rules[ index ],
);

export const getType = createSelector( getRule, selectors.getType );
export const getAllDay = createSelector( getRule, selectors.getAllDay );
export const getMultiDay = createSelector( getRule, selectors.getMultiDay );
export const getMultiDaySpan = createSelector( getRule, selectors.getMultiDaySpan );
export const getStartDate = createSelector( getRule, selectors.getStartDate );
export const getStartDateObj = createSelector( getRule, selectors.getStartDateObj );
export const getStartDateInput = createSelector( getRule, selectors.getStartDateInput );
export const getStartTime = createSelector( getRule, selectors.getStartTime );
export const getStartTimeNoSeconds = createSelector( getRule, selectors.getStartTimeNoSeconds );
export const getEndDate = createSelector( getRule, selectors.getEndDate );
export const getEndDateObj = createSelector( getRule, selectors.getEndDateObj );
export const getEndDateInput = createSelector( getRule, selectors.getEndDateInput );
export const getEndTime = createSelector( getRule, selectors.getEndTime );
export const getEndTimeNoSeconds = createSelector( getRule, selectors.getEndTimeNoSeconds );
export const getBetween = createSelector( getRule, selectors.getBetween );
export const getLimitType = createSelector( getRule, selectors.getLimitType );
export const getLimit = createSelector( getRule, selectors.getLimit );
export const getLimitDateObj = createSelector( getRule, selectors.getLimitDateObj );
export const getLimitDateInput = createSelector( getRule, selectors.getLimitDateInput );
export const getDays = createSelector( getRule, selectors.getDays );
export const getDay = createSelector( getRule, selectors.getDay );
export const getMonth = createSelector( getRule, selectors.getMonth );
export const getWeek = createSelector( getRule, selectors.getWeek );
export const getTimezone = createSelector( getRule, selectors.getTimezone );

export const getTypeOption = createSelector(
	[ getType ],
	( type ) => find( RECURRENCE_TYPE_RULES_OPTIONS, ( option ) => option.value === type ),
);

export const getLimitTypeOption = createSelector(
	[ getLimitType ],
	( limitType ) => find( SERIES_ENDS_OPTIONS, ( option ) => option.value === limitType ),
);
