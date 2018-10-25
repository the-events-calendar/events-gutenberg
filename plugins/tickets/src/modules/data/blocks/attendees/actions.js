/**
 * Internal dependencies
 */
import * as types from './types';

export const setTitle = ( title ) => ( {
	type: types.SET_ATTENDEES_TITLE,
	payload: {
		title,
	},
} );

export const setInitialState = ( props ) => ( {
	type: types.SET_ATTENDEES_INITIAL_STATE,
	payload: props,
} );
