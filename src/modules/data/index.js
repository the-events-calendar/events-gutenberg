/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools( {
	name: 'The Events Calendar',
} );

const middlewares = [
	thunk,
];

let store = {};

export const initStore = () => {
	store = createStore( reducers, composeEnhancers(
		applyMiddleware( ...middlewares ),
	) );
};

export const getStore = () => {
	return store;
};
