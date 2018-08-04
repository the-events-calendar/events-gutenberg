/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import thunk from 'redux-thunk';

import { dates, multiDay, allDay, endTime, startTime } from '@@tribe/events/data/blocks/middlewares';
import { wpRequest } from '@@tribe/events/data/request/middlewares';

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
	wpRequest,
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
