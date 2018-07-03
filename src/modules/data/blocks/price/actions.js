/**
 * Internal dependencies
 */
import * as types from './types';
import { DEFAULT_STATE } from './reducers';

export const setCost = ( cost ) => ( {
	type: types.SET_PRICE_COST,
	payload: {
		cost,
	},
} );

export const setPosition = ( position ) => ( {
	type: types.SET_PRICE_POSITION,
	payload: {
		position,
	},
} );

export const togglePosition = ( showBefore ) => {
	return setPosition( showBefore ? 'prefix' : 'suffix' );
};

export const setSymbol = ( symbol ) => ( {
	type: types.SET_PRICE_SYMBOL,
	payload: {
		symbol,
	},
} );

export const setDescription = ( description ) => ( {
	type: types.SET_PRICE_DESCRIPTION,
	payload: {
		description,
	},
} );

export const setInitialState = ( { get } ) => ( dispatch ) => {
	dispatch( setCost( get( 'cost', DEFAULT_STATE.cost ) ) );
	dispatch( setSymbol( get( 'currencySymbol', DEFAULT_STATE.symbol ) ) );
	dispatch( setDescription( get( 'costDescription', DEFAULT_STATE.description ) ) );
	dispatch( setPosition( get( 'currencyPosition', DEFAULT_STATE.position ) ) );
};
