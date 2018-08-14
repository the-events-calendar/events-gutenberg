/**
 * External dependencies
 */
import { createSelector } from 'reselect';

export const datetimeSelector = ( state ) => state.blocks.datetime;

export const getStart = createSelector(
	[ datetimeSelector ],
	( values ) => values.start
);

export const getEnd = createSelector(
	[ datetimeSelector ],
	( values ) => values.end
);

export const getAllDay = createSelector(
	[ datetimeSelector ],
	( values ) => values.allDay
);

export const getMultiDay = createSelector(
	[ datetimeSelector ],
	( values ) => values.multiDay
);

export const getDateSeparator = createSelector(
	[ datetimeSelector ],
	( values ) => values.dateTimeSeparator
);

export const getTimeSeparator = createSelector(
	[ datetimeSelector ],
	( values ) => values.timeRangeSeparator,
);

export const getTimeZone = createSelector(
	[ datetimeSelector ],
	( values ) => values.timeZone,
);

export const getTimeZoneVisibility = createSelector(
	[ datetimeSelector ],
	( values ) => values.showTimeZone,
);

export const getTimeZoneLabel = createSelector(
	[ datetimeSelector ],
	( values ) => values.timeZoneLabel,
);

export const getNaturalLanguageLabel = createSelector(
	[ datetimeSelector ],
	( values ) => values.naturalLanguage,
);
