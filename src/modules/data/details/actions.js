/**
 * Internal dependencies
 */
import * as types from './types';

export const enableLoading = ( id ) => ( {
	type: types.SET_DETAILS_LOADING,
	payload: {
		id,
		loading: true,
	},
} );

export const disableLoading = ( id ) => ( {
	type: types.SET_DETAILS_LOADING,
	payload: {
		id,
		loading: false,
	},
} );

export const setDetails = ( id, details ) => ( {
	type: types.SET_DETAILS,
	payload: {
		id,
		details,
	},
} );

export const setPostType = ( id, postType ) => ( {
	type: types.SET_DETAILS_POST_TYPE,
	payload: {
		id,
		postType,
	},
} );
