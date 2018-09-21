/**
 * Internal dependencies
 */
import { types } from '@moderntribe/tickets/data/blocks/ticket';

export const setHeader = ( header ) => ( {
	type: types.SET_TICKET_HEADER,
	payload: {
		header,
	},
} );

export const setSharedCapacity = ( sharedCapacity ) => ( {
	type: types.SET_TICKET_SHARED_CAPACITY,
	payload: {
		sharedCapacity,
	},
} );

export const setSettingsOpen = ( isSettingsOpen ) => ( {
	type: types.SET_TICKET_SETTINGS_OPEN,
	payload: {
		isSettingsOpen,
	},
} );

export const openSettings = () => setSettingsOpen( true );
export const closeSettings = () => setSettingsOpen( false );
