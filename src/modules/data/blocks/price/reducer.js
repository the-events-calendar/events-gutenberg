/**
 * Wordpress dependenciess
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getSetting } from 'editor/settings';
import { isTruthy } from 'utils/string';
import * as types from './types';

const position = isTruthy( getSetting( 'reverseCurrencyPosition', 0 ) )
	? 'suffix'
	: 'prefix';

export const DEFAULT_STATE = {
	position,
	symbol: getSetting( 'defaultCurrencySymbol', __( '$', 'events-gutenberg' ) ),
	cost: '',
	description: '',
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_PRICE_COST:
			return {
				...state,
				cost: action.payload.cost,
			};
		case types.SET_PRICE_POSITION:
			return {
				...state,
				position: action.payload.position,
			};
		case types.SET_PRICE_SYMBOL:
			return {
				...state,
				symbol: action.payload.symbol,
			};
		case types.SET_PRICE_DESCRIPTION:
			return {
				...state,
				description: action.payload.description,
			};
		default:
			return state;
	}
};
