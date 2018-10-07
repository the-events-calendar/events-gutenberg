/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { constants } from '@moderntribe/common/data/plugins';

export const getExceptions = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].blocks.exception;
