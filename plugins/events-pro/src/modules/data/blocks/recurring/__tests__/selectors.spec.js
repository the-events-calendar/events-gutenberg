/**
 * External Dependencies
 */
import { constants } from '@moderntribe/common/data/plugins';

/**
 * Internal Dependencies
 */
import * as selectors from '../selectors';

describe( 'RecurrenceSelectors', () => {
	let rule, state;
	beforeEach( () => {
		rule = {
			type: 'single',
			limit_type: 'date',
		};
		state = {
			[ constants.EVENTS_PRO_PLUGIN ]: {
				blocks: {
					recurring: [ rule ],
				},
			},
		};
	} );

	test( 'getRecurrence', () => {
		expect( selectors.getRules( state ) ).toMatchSnapshot();
	} );
	test( 'getTypeOption', () => {
		expect( selectors.getTypeOption( state, { index: 0 } ) ).toMatchSnapshot();
	} );
} );
