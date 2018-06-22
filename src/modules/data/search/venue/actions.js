export function setTerm( id, term ) {
	return {
		type: 'SET_TERM',
		term,
	};
}

export function clear( id ) {
	return {
		type: 'CLEAR',
		results: [],
		id,
	};
}

export function clearSearch() {
	return {
		type: 'CLEAR_SEARCH',
	};
}

export function search( id, payload ) {
	return {
		type: 'SEARCH',
		id,
		payload,
	};
}
