/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import ui from './ui';
import blocks from './blocks';

export default combineReducers( {
	ui,
	blocks,
} );

