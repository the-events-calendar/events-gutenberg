/**
 * External dependencies
 */
import { createSelector } from 'reselect';

export const getRSVPBlock = ( state ) => state.tickets.blocks.rsvp;

export const getRSVPId = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.id,
);

export const getRSVPCreated = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.created,
);

export const getRSVPSettingsOpen = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.settingsOpen,
);

export const getRSVPHasChanges = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.hasChanges,
);

export const getRSVPIsLoading = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.isLoading,
);

export const getRSVPIsSettingsLoading = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.isSettingsLoading,
);

/**
 * ------------------------------------------------------------
 * RSVP Details
 * ------------------------------------------------------------
 */
export const getRSVPDetails = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.details,
);

export const getRSVPTitle = createSelector(
	[ getRSVPDetails ],
	( details ) => details.title,
);

export const getRSVPDescription = createSelector(
	[ getRSVPDetails ],
	( details ) => details.description,
);

export const getRSVPCapacity = createSelector(
	[ getRSVPDetails ],
	( details ) => details.capacity,
);

export const getRSVPNotGoingResponses = createSelector(
	[ getRSVPDetails ],
	( details ) => details.notGoingResponses,
);

export const getRSVPStartDate = createSelector(
	[ getRSVPDetails ],
	( details ) => details.startDate,
);

export const getRSVPStartDateObj = createSelector(
	[ getRSVPDetails ],
	( details ) => details.startDateObj,
);

export const getRSVPStartTime = createSelector(
	[ getRSVPDetails ],
	( details ) => details.startTime,
);

export const getRSVPEndDate = createSelector(
	[ getRSVPDetails ],
	( details ) => details.endDate,
);

export const getRSVPEndDateObj = createSelector(
	[ getRSVPDetails ],
	( details ) => details.endDateObj,
);

export const getRSVPEndTime = createSelector(
	[ getRSVPDetails ],
	( details ) => details.endTime,
);

/**
 * ------------------------------------------------------------
 * RSVP Temp Details
 * ------------------------------------------------------------
 */
export const getRSVPTempDetails = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempDetails,
);

export const getRSVPTempTitle = createSelector(
	[ getRSVPTempDetails ],
	( tempDetails ) => tempDetails.title,
);

export const getRSVPTempDescription = createSelector(
	[ getRSVPTempDetails ],
	( tempDetails ) => tempDetails.description,
);

export const getRSVPTempCapacity = createSelector(
	[ getRSVPTempDetails ],
	( tempDetails ) => tempDetails.capacity,
);

export const getRSVPTempNotGoingResponses = createSelector(
	[ getRSVPTempDetails ],
	( tempDetails ) => tempDetails.notGoingResponses,
);

export const getRSVPTempStartDate = createSelector(
	[ getRSVPTempDetails ],
	( tempDetails ) => tempDetails.startDate,
);

export const getRSVPTempStartDateObj = createSelector(
	[ getRSVPTempDetails ],
	( tempDetails ) => tempDetails.startDateObj,
);

export const getRSVPTempStartTime = createSelector(
	[ getRSVPTempDetails ],
	( tempDetails ) => tempDetails.startTime,
);

export const getRSVPTempEndDate = createSelector(
	[ getRSVPTempDetails ],
	( tempDetails ) => tempDetails.endDate,
);

export const getRSVPTempEndDateObj = createSelector(
	[ getRSVPTempDetails ],
	( tempDetails ) => tempDetails.endDateObj,
);

export const getRSVPTempEndTime = createSelector(
	[ getRSVPTempDetails ],
	( tempDetails ) => tempDetails.endTime,
);

/**
 * ------------------------------------------------------------
 * RSVP Header Image
 * ------------------------------------------------------------
 */
export const getRSVPHeaderImage = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.headerImage,
);

export const getRSVPHeaderImageId = createSelector(
	[ getRSVPHeaderImage ],
	( headerImage ) => headerImage.id,
);

export const getRSVPHeaderImageSrc = createSelector(
	[ getRSVPHeaderImage ],
	( headerImage ) => headerImage.src,
);

export const getRSVPHeaderImageAlt = createSelector(
	[ getRSVPHeaderImage ],
	( headerImage ) => headerImage.alt,
);
