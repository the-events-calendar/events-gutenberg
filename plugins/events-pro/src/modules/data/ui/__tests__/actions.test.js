/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

/**
 * Internal dependencies
 */
import { actions } from '@moderntribe/events-pro/data/ui';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - UI actions', () => {
	it( 'Should toggle the repeat block', () => {
		expect( actions.toggleRepeatBlocksVisibility() ).toMatchSnapshot();
	} );
} );
