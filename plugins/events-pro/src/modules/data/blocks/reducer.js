/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import recurring from '@moderntribe/events-pro/data/blocks/recurring/reducer';
import exception from '@moderntribe/events-pro/data/blocks/exception/reducer';

export default combineReducers( {
	recurring,
	exception,
} );
