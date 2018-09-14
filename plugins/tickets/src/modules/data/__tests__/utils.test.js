/**
 * Internal dependencies
 */
import { PREFIX_TICKETS_STORE } from '@moderntribe/tickets/data/utils';

describe( 'Tickets prefix', () => {
	it( 'should follow prefix convention', () => {
		expect( PREFIX_TICKETS_STORE ).toBe( '@@MT/TICKETS' );
	} );
} );
