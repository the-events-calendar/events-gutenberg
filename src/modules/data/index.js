/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import thunk from 'redux-thunk';

import { dates, multiDay, allDay, endTime, startTime } from 'data/blocks/middlewares';
import { search } from 'data/search/middlewares';

const composeEnhancers = composeWithDevTools( {
	name: 'The Events Calendar',
} );

const middlewares = [
	thunk,
	dates,
	startTime,
	endTime,
	multiDay,
	allDay,
	search,
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
