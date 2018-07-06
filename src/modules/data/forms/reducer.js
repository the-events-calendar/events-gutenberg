/**
 * Internal dependencies
 */
import * as types from './types';
import { form } from './reducers';

export default ( state = {}, action ) => {
	switch ( action.type ) {
		case types.ADD_FORM:
		case types.CLEAR_FORM:
		case types.SET_FORM_FIELDS:
		case types.CREATE_FORM_DRAFT:
		case types.EDIT_FORM_ENTRY:
		case types.SUBMIT_FORM:
			return {
				...state,
				[ action.payload.id ]: form( state[ action.payload.id ], action ),
			};
		default:
			return state;
	}
};
