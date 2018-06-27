/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import blocks from './blocks';
import ui from './ui';

export default combineReducers( {
	blocks,
	ui,
} );

