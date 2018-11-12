/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { constants } from '@moderntribe/common/data/plugins';

export const getStatus = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].status;

export const isCompleted = createSelector( getStatus, status => !! status.done );
export const getProgress = createSelector( getStatus, status => status.progress );
