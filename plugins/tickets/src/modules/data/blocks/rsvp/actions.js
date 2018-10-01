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

export const setRSVPId = ( id ) => ( {
	type: types.SET_RSVP_ID,
	payload: {
		id,
	},
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

export const setRSVPNotGoingResponses = ( notGoingResponses ) => ( {
	type: types.SET_RSVP_NOT_GOING_RESPONSES,
	payload: {
		notGoingResponses,
	},
} );

export const setRSVPStartDate = ( startDate ) => ( {
	type: types.SET_RSVP_START_DATE,
	payload: {
		startDate,
	},
} );

export const setRSVPStartDateObj = ( startDateObj ) => ( {
	type: types.SET_RSVP_START_DATE_OBJ,
	payload: {
		startDateObj,
	},
} );

export const setRSVPEndDate = ( endDate ) => ( {
	type: types.SET_RSVP_END_DATE,
	payload: {
		endDate,
	},
} );

export const setRSVPEndDateObj = ( endDateObj ) => ( {
	type: types.SET_RSVP_END_DATE_OBJ,
	payload: {
		endDateObj,
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

export const setRSVPSettingsOpen = ( settingsOpen ) => ( {
	type: types.SET_RSVP_SETTINGS_OPEN,
	payload: {
		settingsOpen,
	},
} );

export const setRSVPHasChanges = ( hasChanges ) => ( {
	type: types.SET_RSVP_HAS_CHANGES,
	payload: {
		hasChanges,
	},
} );

export const setRSVPIsLoading = ( isLoading ) => ( {
	type: types.SET_RSVP_IS_LOADING,
	payload: {
		isLoading,
	},
} );

export const setRSVPHeaderImage = ( payload ) => ( {
	type: types.SET_RSVP_HEADER_IMAGE,
	payload,
} );


export const setRSVPTempTitle = ( tempTitle ) => ( {
	type: types.SET_RSVP_TEMP_TITLE,
	payload: {
		tempTitle,
	},
} );

export const setRSVPTempDescription = ( tempDescription ) => ( {
	type: types.SET_RSVP_TEMP_DESCRIPTION,
	payload: {
		tempDescription,
	},
} );

export const setRSVPTempCapacity = ( tempCapacity ) => ( {
	type: types.SET_RSVP_TEMP_CAPACITY,
	payload: {
		tempCapacity,
	},
} );

export const setRSVPTempNotGoingResponses = ( tempNotGoingResponses ) => ( {
	type: types.SET_RSVP_TEMP_NOT_GOING_RESPONSES,
	payload: {
		tempNotGoingResponses,
	},
} );

export const setRSVPTempStartDate = ( tempStartDate ) => ( {
	type: types.SET_RSVP_TEMP_START_DATE,
	payload: {
		tempStartDate,
	},
} );

export const setRSVPTempStartDateObj = ( tempStartDateObj ) => ( {
	type: types.SET_RSVP_TEMP_START_DATE_OBJ,
	payload: {
		tempStartDateObj,
	},
} );

export const setRSVPTempEndDate = ( tempEndDate ) => ( {
	type: types.SET_RSVP_TEMP_END_DATE,
	payload: {
		tempEndDate,
	},
} );

export const setRSVPTempEndDateObj = ( tempEndDateObj ) => ( {
	type: types.SET_RSVP_TEMP_END_DATE_OBJ,
	payload: {
		tempEndDateObj,
	},
} );

export const setRSVPTempStartTime = ( tempStartTime ) => ( {
	type: types.SET_RSVP_TEMP_START_TIME,
	payload: {
		tempStartTime,
	},
} );

export const setRSVPTempEndTime = ( tempEndTime ) => ( {
	type: types.SET_RSVP_TEMP_END_TIME,
	payload: {
		tempEndTime,
	},
} );

export const setRSVPDetails = ( payload ) => ( {
	type: types.SET_RSVP_DETAILS,
	payload,
} );

export const setRSVPTempDetails = ( payload ) => ( {
	type: types.SET_RSVP_TEMP_DETAILS,
	payload,
} );
