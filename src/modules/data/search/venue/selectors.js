export function getSearch( state ) {
	return state.search || '';
}

export function getPosts( state ) {
	const { results, loading } = state;
	return {
		results,
		loading,
	};
}

export function getLoading( state ) {
	return state.loading;
}

export function getSearchLoading( state ) {
	return state.loading;
}

export function getResults( state ) {
	return state.results;
}
