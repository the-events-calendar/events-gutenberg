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

export const setInitialState = ( { get } ) => ( dispatch ) => {
	dispatch( setWebsite( get( 'url' ) ) );
	dispatch( setLabel( get( 'urlLabel', DEFAULT_STATE.label ) ) );
};

