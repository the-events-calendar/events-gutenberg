/**
 * External Dependencies
 */
import { constants } from '@moderntribe/common/data/plugins';

/**
 * Internal Dependencies
 */
import * as selectors from '../selectors';

describe( 'Exception Selectors', () => {
	let exception, state;
	beforeEach( () => {
		exception = {
			type: 'single',
		};
		state = {
			[ constants.EVENTS_PRO_PLUGIN ]: {
				blocks: {
					exception: [ exception ],
				},
			},
		};
	} );

	test( 'getExceptions', () => {
		expect( selectors.getExceptions( state ) ).toMatchSnapshot();
	} );
	test( 'getTypeOption', () => {
		expect( selectors.getTypeOption( state, { index: 0 } ) ).toMatchSnapshot();
	} );
} );
