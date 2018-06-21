export function setDetails( id, details ) {
	return {
		type: 'SET_DETAILS',
		id,
		details,
	};
}

export function setDraftTitle( title ) {
	return {
		type: 'SET_DRAFT_TITLE',
		title,
	};
}

export function setDraftDetails( details ) {
	return {
		type: 'SET_DRAFT_DETAILS',
		draft: details,
	};
}

export function editDraft( id, fields ) {
	return {
		type: 'EDIT_DRAFT',
		id,
		fields,
	};
}

export function createDraft( fields ) {
	return {
		type: 'CREATE_DRAFT',
		fields,
	};
}

export function removeDraft( id ) {
	return {
		type: 'REMOVE_DRAFT',
		id,
	};
}

export function registerVenue( id ) {
	return {
		type: 'REGISTER_VENUE',
		id,
	};
}

export function submit() {
	return {
		type: 'SUBMIT',
	};
}

export function clear() {
	return {
		type: 'CLEAR',
	};
}

export function clearSearch() {
	return {
		type: 'CLEAR_SEARCH',
	};
}
