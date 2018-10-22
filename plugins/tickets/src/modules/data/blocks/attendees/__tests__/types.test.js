/**
 * Internal dependencies
 */
import { types } from '@moderntribe/tickets/data/blocks/attendees';
import { PREFIX_TICKETS_STORE } from '@moderntribe/tickets/data/utils';

describe( '[STORE] - Attendees types', () => {
	it( 'Should match the types values', () => {
		expect( types.SET_ATTENDEES_TITLE ).toBe( `${ PREFIX_TICKETS_STORE }/SET_ATTENDEES_TITLE` );
	} );
} );
