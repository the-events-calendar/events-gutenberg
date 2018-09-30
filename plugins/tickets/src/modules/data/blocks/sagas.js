/**
 * Internal dependencies
 */
import { store } from '@moderntribe/common/store';
import { sagas as RSVPSagas } from '@moderntribe/tickets/data/blocks/rsvp';
import { sagas as TicketSagas } from '@moderntribe/tickets/data/blocks/ticket';

[
	RSVPSagas,
	TicketSagas,
].forEach( sagas => store.run( sagas ) );
