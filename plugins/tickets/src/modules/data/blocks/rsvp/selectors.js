/**
 * External dependencies
 */
import { createSelector } from 'reselect';

export const getRSVPBlock = ( state ) => state.tickets.blocks.rsvp;

export const getRSVPId = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.id,
);

export const getRSVPTitle = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.title,
);

export const getRSVPDescription = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.description,
);

export const getRSVPCapacity = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.capacity,
);

export const getRSVPNotGoingResponses = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.notGoingResponses,
);

export const getRSVPStartDate = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.startDate,
);

export const getRSVPStartDateObj = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.startDateObj,
);

export const getRSVPStartTime = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.startTime,
);

export const getRSVPEndDate = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.endDate,
);

export const getRSVPEndDateObj = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.endDateObj,
);

export const getRSVPEndTime = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.endTime,
);

export const getRSVPTempTitle = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempTitle,
);

export const getRSVPTempDescription = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempDescription,
);

export const getRSVPTempCapacity = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempCapacity,
);

export const getRSVPTempNotGoingResponses = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempNotGoingResponses,
);

export const getRSVPTempStartDate = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempStartDate,
);

export const getRSVPTempStartDateObj = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempStartDateObj,
);

export const getRSVPTempStartTime = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempStartTime,
);

export const getRSVPTempEndDate = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempEndDate,
);

export const getRSVPTempEndDateObj = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempEndDateObj,
);

export const getRSVPTempEndTime = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.tempEndTime,
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
