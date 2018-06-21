export function setPost( id, payload ) {
	return {
		type: 'SET_POST',
		id,
		payload,
	};
}

export function removeDraft( id ) {
	return {
		type: 'REMOVE_DRAFT',
		id,
	};
}

export function editPost( id, payload ) {
	return {
		type: 'EDIT_POST',
		id,
		payload,
	};
}

export function createDraft( id, payload ) {
	return {
		type: 'CREATE_DRAFT',
		id,
		payload,
	};
}

export function setDraftTitle( id, title ) {
	return {
		type: 'SET_DRAFT_TITLE',
		id,
		title,
	};
}

export function setDraftPost( id, payload ) {
	return {
		type: 'SET_DRAFT_POST',
		id,
		payload,
	};
}

export function setTerm( id, term ) {
	return {
		type: 'SET_TERM',
		id,
		term,
	};
}

export function clear( id ) {
	return {
		type: 'CLEAR',
		id,
	};
}

export function clearSearch( id ) {
	return {
		type: 'CLEAR_SEARCH',
		id,
	};
}

export function search( id, payload ) {
	return {
		type: 'SEARCH',
		id,
		payload,
	};
}

export function submit( id ) {
	return {
		type: 'SUBMIT',
		id,
	};
}

export function setOrganizer( id, organizer ) {
	return {
		type: 'SET_ORGANIZER',
		id,
		organizer,
	};
}
