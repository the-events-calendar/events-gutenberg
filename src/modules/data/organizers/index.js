/**
 * Wordpress dependencies
 */
import { registerStore, combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import * as reducers from './reducers';
import * as actions from './actions';
import * as selectors from './selectors';
import * as resolvers from './resolvers';

export const POST_TYPE = 'tribe_organizer';

export const STORE_NAME = 'tec.organizer.blocks';

export const store = registerStore( STORE_NAME, {
	reducer: combineReducers( reducers ),
	actions,
	selectors,
	resolvers,
} );
