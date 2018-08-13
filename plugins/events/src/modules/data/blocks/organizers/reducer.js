/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { classic, blocks } from './reducer';

export default combineReducers( {
	blocks,
	classic,
} );
