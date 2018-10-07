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
export const isRulePanelVisible = createSelector(
	[ getUI ],
	( ui ) => ui.isRulePanelVisible
);
export const isExceptionPanelVisible = createSelector(
	[ getUI ],
	( ui ) => ui.isExceptionPanelVisible
);
export const isRulePanelExpanded = createSelector(
	[ getUI ],
	( ui ) => ui.isRulePanelExpanded
);
export const isExceptionPanelExpanded = createSelector(
	[ getUI ],
	( ui ) => ui.isExceptionPanelExpanded
);
