/**
 * Internal dependencies
 */
import * as types from './types';
import { DEFAULT_STATE } from './reducers';

export const setWebsite = ( url ) => ( {
	type: types.SET_WEBSITE_URL,
	payload: {
		url,
	},
} );

export const setLabel = ( label ) => ( {
	type: types.SET_WEBSITE_LABEL,
	payload: {
		label,
	},
} );

export const setInitialState = ( attributes = {} ) => ( dispatch ) => {
	dispatch( setWebsite( attributes.url || DEFAULT_STATE.url ) );
	dispatch( setLabel( attributes.urlLabel || DEFAULT_STATE.label ) );
};

