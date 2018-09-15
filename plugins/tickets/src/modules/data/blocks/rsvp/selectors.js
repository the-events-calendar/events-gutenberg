/**
 * External dependencies
 */
import { createSelector } from 'reselect';

export const getRSVPBlock = ( state ) => state.tickets.blocks.rsvp;

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

export const getRSVPStartTime = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.startTime,
);

export const getRSVPEndDate = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.endDate,
);

export const getRSVPEndTime = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.endTime,
);

export const getRSVPCreated = createSelector(
	[ getRSVPBlock ],
	( rsvp ) => rsvp.created,
);
