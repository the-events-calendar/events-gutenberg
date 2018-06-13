/**
 * External dependencies
 */
import { get, pick, map, identity, isEmpty } from 'lodash';

import { dispatch } from '@wordpress/data';

const { apiRequest, data } = wp;
const { registerStore, combineReducers } = data;

import * as reducers from './reducers';

export const POST_TYPE = 'tribe_organizer';

export const STORE_NAME = 'tec.organizer.blocks';
const details = {
	reducer: combineReducers( reducers ),
	actions: {
		setPost( id, payload ) {
			return {
				type: 'SET_POST',
				id,
				payload,
			};
		},
		removeDraft( id ) {
			return {
				type: 'REMOVE_DRAFT',
				id,
			};
		},
		editPost( id, payload ) {
			return {
				type: 'EDIT_POST',
				id,
				payload,
			};
		},
		createDraft( id, payload ) {
			return {
				type: 'CREATE_DRAFT',
				id,
				payload,
			};
		},
		setDraftTitle( id, title ) {
			return {
				type: 'SET_DRAFT_TITLE',
				id,
				title,
			};
		},
		setDraftPost( id, payload ) {
			return {
				type: 'SET_DRAFT_POST',
				id,
				payload,
			};
		},
		setTerm( id, term ) {
			return {
				type: 'SET_TERM',
				id,
				term,
			};
		},
		clear( id ) {
			return {
				type: 'CLEAR',
				id,
			};
		},
		clearSearch( id ) {
			return {
				type: 'CLEAR_SEARCH',
				id,
			};
		},
		search( id, payload ) {
			return {
				type: 'SEARCH',
				id,
				payload,
			};
		},
		submit( id ) {
			return {
				type: 'SUBMIT',
				id,
			};
		},
		setOrganizer( id, organizer ) {
			return {
				type: 'SET_ORGANIZER',
				id,
				organizer,
			};
		},
	},
	selectors: {
		getPosts( state, id ) {
			const { blocks } = state;
			const block = blocks[ id ] || {};
			const searches = get( block, 'searches', {} );
			return {
				...pick( block, [ 'loading' ] ),
				...searches,
			};
		},
		getSearch( state, id ) {
			const { blocks } = state;
			const block = blocks[ id ] || {};
			const searches = get( block, 'searches', {} );
			return get( searches, 'search', '' );
		},
		getDetails( state, id, organizer ) {
			const { blocks } = state;
			const block = blocks[ id ] || {};
			return get( block, 'post', {} );
		},
		getLoading( state, id ) {
			const { blocks } = state;
			const block = blocks[ id ] || {};
			return block.loading;
		},
		getSearchLoading( state, id ) {
			const { blocks } = state;
			const block = blocks[ id ] || {};
			const { searches = {} } = block;
			return searches.loading;
		},
		getResults( state, id ) {
			const { blocks } = state;
			const block = blocks[ id ] || {};
			const { searches = {} } = block;
			return searches.results;
		},
		getByID( state, id, key, defaultValue ) {
			const { blocks } = state;
			const block = blocks[ id ] || {};
			return get( block, key, defaultValue );
		},
		isBlock( state, organizer ) {
			const organizers = map( state.blocks, ( block ) => block.organizer );
			const search = organizers.filter( ( id ) => id === organizer );
			return ! isEmpty( search );
		},
	},
	resolvers: {
		async getDetails( state, id, organizer ) {
			const { blocks } = state;
			const block = blocks[ id ] || {};
			const post = get( block, 'post', {} );
			if ( ! organizer ) {
				return post;
			}

			const body = await apiRequest( { path: `/wp/v2/${ POST_TYPE }/${ organizer }` } );
			dispatch( STORE_NAME ).setPost( id, body );
		},
	},
};
export const store = registerStore( STORE_NAME, details );
