/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import recurring from '@moderntribe/events-pro/data/blocks/recurring';
import exception from '@moderntribe/events-pro/data/blocks/exception';

export default combineReducers( {
	recurring,
	exception,
} );
