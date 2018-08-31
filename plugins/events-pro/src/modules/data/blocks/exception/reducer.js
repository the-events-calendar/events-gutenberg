/**
 * Internal dependencies
 */
import * as types from './types';

export default function exception( state = [], action ) {
	switch ( action.type ) {
		case types.ADD_EXCEPTION_FIELD:
			return [
				...state,
				action.payload,
			];
		case types.REMOVE_EXCEPTION_FIELD:
			return state.filter( field => field.id !== action.payload.id );
		default:
			return state;
	}
}
