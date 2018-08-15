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
	let store = window.__tribe_common_store__ || null;

	if ( store ) {
		return store;
	}

	const middlewares = [
		thunk,
		wpRequest,
	];

	const composeEnhancers = composeWithDevTools( { name: 'tribe/common' } );

	store = createStore( reducer( {} ), composeEnhancers( applyMiddleware( ...middlewares ) ) );
	augmentStore( reducer, store );
	window.__tribe_common_store__ = store;

	return store;
};
