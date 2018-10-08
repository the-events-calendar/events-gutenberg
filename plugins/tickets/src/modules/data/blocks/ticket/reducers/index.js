/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import ui from './ui';
import tickets from './tickets';

export default combineReducers( {
	ui,
	tickets,
} );
