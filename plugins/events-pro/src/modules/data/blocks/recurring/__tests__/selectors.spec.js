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
		};
		state = {
			[ constants.EVENTS_PRO_PLUGIN ]: {
				blocks: {
					recurrence: [ rule ],
				},
			},
		};
	} );

	test( 'getRecurrence', () => {
		expect( selectors.getRules( state ) ).toMatchSnapshot();
	} );
	test( 'getRuleTypeOption', () => {
		expect( selectors.getRuleTypeOption( rule ) ).toMatchSnapshot();
	} );
} );
