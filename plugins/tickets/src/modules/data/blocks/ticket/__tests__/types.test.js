/**
 * Internal dependencies
 */
import { PREFIX_TICKETS_STORE } from '@moderntribe/tickets/data/utils';
import { types } from '@moderntribe/tickets/data/blocks/ticket';

describe( 'Tickets block types', () => {
	test( 'Use the prefix on the types', () => {
		expect( types.SET_TICKET_SHARED_CAPACITY )
			.toBe( `${ PREFIX_TICKETS_STORE }/SET_TICKET_SHARED_CAPACITY` );
		expect( types.SET_TICKET_HEADER )
			.toBe( `${ PREFIX_TICKETS_STORE }/SET_TICKET_HEADER` );
		expect( types.SET_TICKET_SETTINGS_OPEN )
			.toBe( `${ PREFIX_TICKETS_STORE }/SET_TICKET_SETTINGS_OPEN` );
	} );
} );
