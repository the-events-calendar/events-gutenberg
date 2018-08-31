/**
 * External dependencies
 */
import reducer from './reducers';

import { actions } from '@moderntribe/common/data/reducers/plugins';
import { store } from '@moderntribe/common/store';

export const initStore = () => {
	const { dispatch, injectReducers } = store;

	dispatch( actions.addPlugin( 'tickets' ) );
	injectReducers( { [ 'tickets' ]: reducer } );
};

export const getStore = () => store;
