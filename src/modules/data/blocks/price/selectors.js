/**
 * External dependencies
 */
import { createSelector } from 'reselect';

/**
 * Internal dependencies
 */
import { getBlocks } from 'data/blocks/selectors';

export const getPriceBlock = createSelector(
	[ getBlocks ],
	( blocks ) => blocks.price,
);

export const getPrice = createSelector(
	[ getPriceBlock ],
	( block ) => block.cost,
);

export const getSymbol = createSelector(
	[ getPriceBlock ],
	( block ) => block.symbol,
);

export const getPosition = createSelector(
	[ getPriceBlock ],
	( block ) => block.position,
);

export const getDescription = createSelector(
	[ getPriceBlock ],
	( block ) => block.description,
);
