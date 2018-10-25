/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import * as types from './types';

function edit( state, action ) {
	const field = Object.assign( {}, state[ action.index ], action.payload );

	if ( state.length === 1 ) {
		return [ field ];
	}
	return [
		...state.slice( 0, action.index ),
		field,
		...state.slice( action.index + 1 ),
	];
}

export default function exception( state = [], action ) {
	switch ( action.type ) {
		case types.ADD_EXCEPTION:
			return [
				...state,
				action.payload,
			];
		case types.EDIT_EXCEPTION:
			return edit( state, action );
		case types.REMOVE_EXCEPTION:
			return state.filter( ( _, index ) => index !== action.index );
		case types.SYNC_EXCEPTIONS_FROM_DB:
			return JSON.parse( action.payload );
		default:
			return state;
	}
}
