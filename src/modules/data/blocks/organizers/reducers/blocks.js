import { combineReducers } from 'redux';

import * as types from './../types';
import block from './block';
const DEFAULT_STATE = {};

const byId = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.ADD_ORGANIZER_BLOCK:
		case types.REMOVE_ORGANIZER_BLOCK:
			return {
				...state,
				[ action.payload.id ]: block( state[ action.payload.id ], action ),
			};
		default:
			return state;
	}
};

const allIds = ( state = [], action ) => {
	switch ( action.type ) {
		case types.ADD_ORGANIZER_BLOCK:
			return [ ...state, action.payload.organizer ];
		case types.REMOVE_ORGANIZER_BLOCK:
			return [ ...state ].filter( ( organizer ) => organizer !== action.payload.organizer );
		default:
			return state;
	}
};

export default combineReducers( {
	byId,
	allIds,
} );
