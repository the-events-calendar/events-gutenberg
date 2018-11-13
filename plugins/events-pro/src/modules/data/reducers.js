/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import ui from './ui';
import blocks from './blocks';
import status from './status';

export default combineReducers( {
	ui,
	blocks,
	status,
} );
