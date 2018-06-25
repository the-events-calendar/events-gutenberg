export function setPage( page ) {
	return {
		type: 'SET_PAGE',
		page,
	};
}

export function setTotal( total ) {
	return {
		type: 'SET_TOTAL',
		total,
	};
}

export function addPosts( posts ) {
	return {
		type: 'ADD_POSTS',
		posts,
	};
}

export function setPosts( posts ) {
	return {
		type: 'SET_POSTS',
		posts,
	};
}

export function block() {
	return {
		type: 'SET_FETCHING',
		fetching: true,
	};
}

export function unblock() {
	return {
		type: 'SET_FETCHING',
		fetching: false,
	};
}

export function fetch( args ) {
	return {
		type: 'FETCH',
		payload: args,
	};
}

export function search( term, args ) {
	return {
		type: 'SEARCH',
		search: term,
		payload: args,
	};
}
