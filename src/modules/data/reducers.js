/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import blocks from './blocks/reducers';

export default combineReducers( {
	blocks,
} );
