/**
 * External dependencies
 */
import reducer from './reducers';

import { actions, constants } from '@moderntribe/common/data/plugins';
import { store } from '@moderntribe/common/store';
const { EVENTS_PRO_PLUGIN } = constants;

export const initStore = () => {
	const { dispatch, injectReducers } = store;

	dispatch( actions.addPlugin( EVENTS_PRO_PLUGIN ) );
	injectReducers( { [ EVENTS_PRO_PLUGIN ]: reducer } );
};

export const getStore = () => store;
