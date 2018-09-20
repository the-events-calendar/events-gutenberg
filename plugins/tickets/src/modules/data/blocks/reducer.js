/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import rsvp from './rsvp';
import ticket from './ticket';

export default combineReducers( {
	rsvp,
	ticket,
} );
