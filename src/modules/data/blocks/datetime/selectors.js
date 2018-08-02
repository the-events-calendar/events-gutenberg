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
	( values ) => values.timezone,
);

export const getNaturalLanguageLabel = createSelector(
	[ datetimeSelector ],
	( values ) => values.naturalLanguage,
);
