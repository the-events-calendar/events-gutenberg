/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { constants } from '@moderntribe/common/data/plugins';

export const getRules = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].blocks.recurring;
