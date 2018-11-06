/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */
import * as types from '../types';
import field from './field';

const fieldsById = ( state = {}, action ) => {
	const { payload = {} } = action;
	switch ( action.type ) {
		case types.ADD_ADDITIONAL_FIELD:
		case types.SET_ADDITIONAL_FIELD_VALUE:
		case types.SET_ADDITIONAL_FIELD_TYPE:
		case types.SET_ADDITIONAL_FIELD_OPTIONS:
		case types.SET_ADDITIONAL_FIELD_IS_PRISTINE:
		case types.SET_ADDITIONAL_FIELD_DIVIDER_LIST:
		case types.SET_ADDITIONAL_FIELD_LABEL:
		case types.SET_ADDITIONAL_FIELD_DIVIDER_END:
		case types.APPEND_ADDITIONAL_FIELD_VALUE:
		case types.REMOVE_ADDITIONAL_FIELD_VALUE:
		case types.SET_ADDITIONAL_FIELD_META_KEY:
		case types.SET_ADDITIONAL_FIELD_OUTPUT:
			return {
				...state,
				[ payload.name ]: field( state[ payload.name ], action ),
			};
		case types.REMOVE_ADDITIONAL_FIELD:
			return omit( state, [ payload.name ] );
		default:
			return state;
	}
};

const allFields = ( state = [], action ) => {
	switch ( action.type ) {
		case types.ADD_ADDITIONAL_FIELD:
			return [ ...state, action.payload.name ];
		case types.REMOVE_ADDITIONAL_FIELD:
			return state.filter( ( name ) => name !== action.payload.name );
		default:
			return state;
	}
};

export default combineReducers( {
	byId: fieldsById,
	allIds: allFields,
} );
