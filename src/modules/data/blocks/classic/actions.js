/**
 * Internal dependencies
 */
import * as types from './types';
import { DEFAULT_STATE } from './reducers';

export const setDetailsTitle = ( title ) => ( {
	type: types.SET_CLASSIC_DETAILS_TITLE,
	payload: {
		title,
	},
} );

export const setOrganizerTitle = ( title ) => ( {
	type: types.SET_CLASSIC_ORGANIZERS_TITLE,
	payload: {
		title,
	},
} );

export const setInitialState = ( { get } ) => ( dispatch ) => {
	dispatch( setDetailsTitle( get( 'detailsTitle', DEFAULT_STATE.detailsTitle ) ) );
	dispatch( setOrganizerTitle( get( 'organizerTitle', DEFAULT_STATE.organizerTitle ) ) );
};
