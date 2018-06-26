/**
 * Internal dependencies
 */
import * as types from './types';

export const setCost = ( cost ) => ( {
	type: types.SET_PRICE_COST,
	payload: {
		cost,
	},
} );

export const setPriceSymbolPosition = ( position ) => ( {
	type: types.SET_PRICE_POSITION,
	payload: {
		position,
	},
} );

export const setPriceSymbol = ( symbol ) => ( {
	type: types.SET_PRICE_SYMBOL,
	payload: {
		symbol,
	},
} );

export const setPriceDescription = ( description ) => ( {
	type: types.SET_PRICE_DESCRIPTION,
	payload: {
		description,
	},
} );

export const setInitialState = ( attributes ) => ( {
	type: types.SET_PRICE_INITIAL_STATE,
	meta: {
		initial: true,
		attributes,
		methods: {
			setCost,
			setPriceSymbolPosition,
			setPriceSymbol,
			setPriceDescription,
		},
	},
} );
