/**
 * External dependencies
 */
import { createSelector } from 'reselect';

export const getWebsiteBlock = ( state ) => state.blocks.website;

export const getUrl = createSelector(
	[ getWebsiteBlock ],
	( website ) => website.url,
);

export const getLabel = createSelector(
	[ getWebsiteBlock ],
	( website ) => website.label,
);
