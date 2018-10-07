/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import recurring from '@moderntribe/events-pro/src/modules/data/blocks/recurring';
import exception from '@moderntribe/events-pro/src/modules/data/blocks/exception';

export default combineReducers( {
	recurring,
	exception,
} );
