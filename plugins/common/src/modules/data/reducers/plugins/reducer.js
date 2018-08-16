/**
 * External dependencies
 */
import { omit } from 'lodash';

/**
 * Internal dependencies
 */
import { types } from '@moderntribe/common/data/reducers/plugins';

export default ( state = {}, action ) => {
	switch ( action.type ) {
		case types.ADD_PLUGIN:
		case types.ACTIVATE_PLUGIN:
			return {
				...state,
				[ action.payload.name ]: true,
			};
		case types.DEACTIVATE_PLUGIN:
			return {
				...state,
				[ action.payload.name ]: false,
			};
		case types.REMOVE_PLUGIN:
			return omit( state, action.payload.name );
		default:
			return state;
	}
};
