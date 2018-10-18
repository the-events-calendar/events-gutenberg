/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { constants } from '@moderntribe/common/data/plugins';

export const getPlugin = ( state ) => state[ constants.EVENTS_PRO_PLUGIN ];
export const getBlocks = createSelector(
	[ getPlugin ],
	( plugin ) => plugin.blocks,
);
export const getAdditionalFields = createSelector(
	[ getBlocks ],
	( blocks ) => blocks.additionalFields,
);
