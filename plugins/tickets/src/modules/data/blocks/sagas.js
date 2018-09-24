/**
 * Internal dependencies
 */
import { store } from '@moderntribe/common/store';
import * as rsvp from '@moderntribe/tickets/data/blocks/rsvp';

[
	rsvp.sagas,
].forEach( sagas => store.run( sagas ) );
