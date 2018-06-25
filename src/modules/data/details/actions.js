export function addOrganizer( organizer ) {
	return {
		type: 'ADD_ORGANIZER',
		organizer,
	};
}

export function removeOrganizer( organizer ) {
	return {
		type: 'REMOVE_ORGANIZER',
		organizer,
	};
}

export function maybeRemoveOrganizer( organizer ) {
	return {
		type: 'MAYBE_REMOVE_ORGANIZER',
		organizer,
	};
}

export function replaceOrganizers( organizers ) {
	return {
		type: 'REPLACE_ORGANIZERS',
		organizers,
	};
}

export function setWebsiteUrl( url ) {
	return {
		type: 'SET_WEBSITE_URL',
		url,
	};
}

export function setInitialState( values ) {
	return {
		type: 'SET_INITIAL_STATE',
		values,
	};
}

export function toggleDashboard() {
	return { type: 'TOGGLE_DASHBOARD' };
}

export function closeDashboard() {
	return { type: 'CLOSE_DASHBOARD' };
}

export function setMultiDay( multiDay ) {
	return {
		type: 'SET_MULTI_DAY',
		multiDay,
	};
}

export function setAllDay( allDay ) {
	return {
		type: 'SET_ALL_DAY',
		allDay,
	};
}

export function setTimeZone( timezone ) {
	return {
		type: 'SET_TIME_ZONE',
		timezone,
	};
}

export function setStartDate( date ) {
	return {
		type: 'SET_START_DATE',
		date,
	};
}

export function setEndDate( date ) {
	return {
		type: 'SET_END_DATE',
		date,
	};
}

export function setStartTime( seconds ) {
	return {
		type: 'SET_START_TIME',
		seconds,
	};
}

export function setEndTime( seconds ) {
	return {
		type: 'SET_END_TIME',
		seconds,
	};
}

export function setSeparatorDate( separator ) {
	return {
		type: 'SET_DATE_TIME_SEPARATOR',
		separator,
	};
}

export function setSeparatorTime( separator ) {
	return {
		type: 'SET_TIME_RANGE_SEPARATOR',
		separator,
	};
}

export function setCurrencySymbol( symbol ) {
	return {
		type: 'SET_CURRENCY_SYMBOL',
		symbol,
	};
}

export function setCurrencyPosition( position ) {
	return {
		type: 'SET_CURRENCY_POSITION',
		position,
	};
}

export function setCost( cost ) {
	return {
		type: 'SET_COST',
		cost,
	};
}
