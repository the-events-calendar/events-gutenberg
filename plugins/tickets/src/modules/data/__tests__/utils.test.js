/**
 * Internal dependencies
 */
import { PREFIX_TICKETS_STORE } from './../prefix';

describe( 'Tickets prefix', () => {
	it( 'should follow prefix convention', () => {
		expect( PREFIX_TICKETS_STORE ).toBe( '@@MT/TICKETS' );
	} );
} );
