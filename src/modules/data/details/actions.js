/**
 * Internal dependencies
 */
import * as types from './types';

export const enableIsLoading = ( id ) => ( {
	type: types.SET_IS_LOADING,
	payload: {
		id,
		isLoading: true,
	},
} );

export const disableIsLoading = ( id ) => ( {
	type: types.SET_IS_LOADING,
	payload: {
		id,
		isLoading: false,
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
	type: types.SET_POST_TYPE,
	payload: {
		id,
		postType,
	},
} );
