/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { types } from '@moderntribe/tickets/data/blocks/ticket';

const ticketsById = ( state = {}, action ) => {
	switch ( action.type ) {
		default:
			return state;
	}
};

const allTickets = ( state = [], action ) => {
	switch ( action.type ) {
		default:
			return state;
	}
};

export default combineReducers( {
	byId: ticketsById,
	allIds: allTickets,
} );
