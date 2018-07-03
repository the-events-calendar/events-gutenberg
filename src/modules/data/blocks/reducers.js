/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import datetime from './datetime';
import organizers from './organizers';
import price from './price';
import website from './website';
import venue from './venue';

export default combineReducers( {
	datetime,
	venue,
	organizers,
	price,
	website,
} );
