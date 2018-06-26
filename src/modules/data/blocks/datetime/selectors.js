/**
 * External dependencies
 */
import { createSelector } from 'reselect';

/**
 * Internal dependencies
 */
import * as blockSelectors from 'data/blocks/selectors';

export const getAll = createSelector(
	[ blockSelectors.getBlocks ],
	( blocks ) => blocks.datetime,
);
