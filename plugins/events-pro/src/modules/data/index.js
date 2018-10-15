/**
 * External dependencies
 */
import reducer from './reducers';

import { actions } from '@moderntribe/common/data/plugins';
import { store } from '@moderntribe/common/store';
import { EVENTS_PRO_PLUGIN_NAME } from './constants';

export const initStore = () => {
	const { dispatch, injectReducers } = store;

	dispatch( actions.addPlugin( EVENTS_PRO_PLUGIN_NAME ) );
	injectReducers( { [ EVENTS_PRO_PLUGIN_NAME ]: reducer } );
};

export const getStore = () => store;
