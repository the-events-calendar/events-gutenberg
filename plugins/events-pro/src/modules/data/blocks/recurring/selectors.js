/* eslint-disable max-len */

/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { find } from 'lodash';
import { constants } from '@moderntribe/common/data/plugins';

/**
 * Internal dependencies
 */
import {
	RECURRENCE_TYPE_RULES_OPTIONS,
} from './options';

export const getRules = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].blocks.recurring;

export const getRuleTypeOption = createSelector(
	( rule ) => rule,
	( rule ) => find( RECURRENCE_TYPE_RULES_OPTIONS, type => type.value === rule.type )
);
