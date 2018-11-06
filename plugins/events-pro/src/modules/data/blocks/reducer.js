/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import additionalFields from '@moderntribe/events-pro/data/blocks/additional-fields';
import recurring from '@moderntribe/events-pro/data/blocks/recurring/reducer';
import exception from '@moderntribe/events-pro/data/blocks/exception/reducer';

export default combineReducers( {
	additionalFields,
	recurring,
	exception,
} );
