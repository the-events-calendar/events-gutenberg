/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { constants } from '@moderntribe/common/data/plugins';

export const getUI = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ].ui;

export const isRepeatBlockVisible = createSelector(
	[ getUI ],
	( ui ) => ui.isRepeatBlockVisible
);
