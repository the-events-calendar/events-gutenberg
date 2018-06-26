/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import datetime from './datetime/reducers';
import organizers from './organizers/reducers';
import { reducer as price } from './price/reducers';
import website from './website/reducers';

export default combineReducers( {
	datetime,
	organizers,
	price,
	website,
} );
