/**
 * Internal dependencies
 */
import * as types from './types';
import { DEFAULT_STATE } from './reducer';
import { string } from '@moderntribe/common/utils';
import { getPriceSettings } from '@moderntribe/events/editor/settings';

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
	const isNewEvent = string.isTruthy( getPriceSettings().is_new_event );
	const currencySymbol = isNewEvent
		? getPriceSettings().default_currency_symbol
		: get( 'currencySymbol', DEFAULT_STATE.symbol );
	const currencyPosition = isNewEvent
		? getPriceSettings().default_currency_position
		: get( 'currencyPosition', DEFAULT_STATE.position );

	dispatch( setPosition( currencyPosition ) );
	dispatch( setSymbol( currencySymbol ) );
	dispatch( setCost( get( 'cost', DEFAULT_STATE.cost ) ) );
	dispatch( setDescription( get( 'costDescription', DEFAULT_STATE.description ) ) );
};
