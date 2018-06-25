/**
 * External dependencies
 */
import { get, pick, map, isEmpty } from 'lodash';

export function getPosts( state, id ) {
	const { blocks } = state;
	const block = blocks[ id ] || {};
	const searches = get( block, 'searches', {} );
	return {
		...pick( block, [ 'loading' ] ),
		...searches,
	};
}

export function getSearch( state, id ) {
	const { blocks } = state;
	const block = blocks[ id ] || {};
	const searches = get( block, 'searches', {} );
	return get( searches, 'search', '' );
}

export function getDetails( state, id, organizer ) {
	const { blocks } = state;
	const block = blocks[ id ] || {};
	return get( block, 'post', {} );
}

export function getLoading( state, id ) {
	const { blocks } = state;
	const block = blocks[ id ] || {};
	return block.loading;
}

export function getSearchLoading( state, id ) {
	const { blocks } = state;
	const block = blocks[ id ] || {};
	const { searches = {} } = block;
	return searches.loading;
}

export function getResults( state, id ) {
	const { blocks } = state;
	const block = blocks[ id ] || {};
	const { searches = {} } = block;
	return searches.results;
}

export function getByID( state, id, key, defaultValue ) {
	const { blocks } = state;
	const block = blocks[ id ] || {};
	return get( block, key, defaultValue );
}

export function isBlock( state, organizer ) {
	const organizers = map( state.blocks, ( block ) => block.organizer );
	const search = organizers.filter( ( id ) => id === organizer );
	return ! isEmpty( search );
}
