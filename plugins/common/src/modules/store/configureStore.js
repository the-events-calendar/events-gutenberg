/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { augmentStore } from '@nfen/redux-reducer-injector';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import reducer from '@moderntribe/common/data';
import { wpRequest } from './middlewares';

export default () => {
	if ( window.__tribe_common_store__ ) {
		return window.__tribe_common_store__;
	}

	const middlewares = [
		thunk,
		wpRequest,
	];

	const composeEnhancers = composeWithDevTools( { name: 'tribe/common' } );

	const store = createStore( reducer( {} ), composeEnhancers( applyMiddleware( ...middlewares ) ) );
	augmentStore( reducer, store );
	window.__tribe_common_store__ = store;

	return store;
};
