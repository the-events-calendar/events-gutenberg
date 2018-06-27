/**
 * External dependencies
 */
import { createSelector } from 'reselect';

/**
 * Internal dependencies
 */
import { getBlocks } from 'data/blocks/selectors';

export const getWebsiteBlock = createSelector(
	[ getBlocks ],
	( blocks ) => blocks.website,
);

export const getUrl = createSelector(
	[ getWebsiteBlock ],
	( website ) => website.url,
);

export const getLabel = createSelector(
	[ getWebsiteBlock ],
	( website ) => website.label,
);
