/**
 * Internal dependencies
 */
import { types } from '@moderntribe/tickets/data/blocks/rsvp';

export const createRSVP = () => ( {
	type: types.CREATE_RSVP,
} );

export const deleteRSVP = () => ( {
	type: types.DELETE_RSVP,
} );

export const setRSVPTitle = ( title ) => ( {
	type: types.SET_RSVP_TITLE,
	payload: {
		title,
	},
} );

export const setRSVPDescription = ( description ) => ( {
	type: types.SET_RSVP_DESCRIPTION,
	payload: {
		description,
	},
} );

export const setRSVPCapacity = ( capacity ) => ( {
	type: types.SET_RSVP_CAPACITY,
	payload: {
		capacity,
	},
} );

export const setRSVPEnableNotGoing = ( enableNotGoing ) => ( {
	type: types.SET_RSVP_ENABLE_NOT_GOING,
	payload: {
		enableNotGoing,
	},
} );

export const setRSVPStartDate = ( startDate ) => ( {
	type: types.SET_RSVP_START_DATE,
	payload: {
		startDate,
	},
} );

export const setRSVPEndDate = ( endDate ) => ( {
	type: types.SET_RSVP_END_DATE,
	payload: {
		endDate,
	},
} );

export const setRSVPStartTime = ( startTime ) => ( {
	type: types.SET_RSVP_START_TIME,
	payload: {
		startTime,
	},
} );

export const setRSVPEndTime = ( endTime ) => ( {
	type: types.SET_RSVP_END_TIME,
	payload: {
		endTime,
	},
} );
