/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import values from './values/reducers';
import variants from './variants/reducers';
import separators from './separators/reducers';

export default combineReducers( {
	values,
	variants,
	separators,
} );
