/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import blocks from './blocks';
import ui from './ui';
import search from './search';

export default combineReducers( {
	blocks,
	ui,
	search,
} );

