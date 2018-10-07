/**
 * Internal dependencies
 */
import * as types from './types';

export default function exception( state = [], action ) {
	switch ( action.type ) {
		case types.ADD_EXCEPTION:
			return [
				...state,
				action.payload,
			];
		case types.REMOVE_EXCEPTION:
			return state.filter( field => field.id !== action.payload.id );
		default:
			return state;
	}
}
