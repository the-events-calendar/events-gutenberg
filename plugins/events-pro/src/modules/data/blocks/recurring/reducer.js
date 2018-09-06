/**
 * Internal dependencies
 */
import * as types from './types';

export default function recurring( state = [], action ) {
	switch ( action.type ) {
		case types.ADD_RULE:
			return [
				...state,
				action.payload,
			];
		case types.REMOVE_RULE:
			return state.filter( field => field.id !== action.payload.id );
		default:
			return state;
	}
}
