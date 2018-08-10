/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import thunk from 'redux-thunk';

import { wpRequest } from 'data/request/middlewares';

const composeEnhancers = composeWithDevTools( {
	name: 'The Events Calendar',
} );

const middlewares = [
	thunk,
	wpRequest,
];

let store = {};

export const initStore = () => {
	store = createStore( reducer, composeEnhancers(
		applyMiddleware( ...middlewares ),
	) );
};

export const getStore = () => {
	return store;
};
