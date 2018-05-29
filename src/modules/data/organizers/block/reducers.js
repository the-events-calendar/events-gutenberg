/**
 * External dependencies
 */
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';
const { apiRequest } = wp;

/**
 * Internal dependencies
 */
import { apiArgs } from 'utils/request';
import { store, STORE_NAME } from './index';
import { toFields, toOrganizer } from 'elements/organizer-form/utils';

export function order( state = [], action ) {
	switch ( action.type ) {
		case 'ADD_BLOCK_ID':
			return [ ...state, action.id ];
		case 'REMOVE_BLOCK_ID':
			return state.filter( ( item ) => item !== action.id );
		default:
			return state;
	}
}

const POST_TYPE = 'tribe_organizer';
const DEFAULT_BLOCK = {
	edit: false,
	create: false,
	loading: false,
	submit: false,
	searches: {
		search: '',
		results: [],
	},
	post: {},
	draft: {},
};

export function blocks( state = {}, action ) {
	switch ( action.type ) {
		case 'ADD_BLOCK':
			return {
				...state,
				[ action.id ]: {
					...DEFAULT_BLOCK,
				},
			};
		case 'REMOVE_BLOCK': {
			const { [ action.id ]: deletedValue, ...rest } = state;
			return rest;
		}
		case 'SEARCH':
			return searchByTerm( state, action.id, action.payload );
		case 'SET_RESULTS': {
			const current = state[ action.id ];
			return {
				...state,
				[ action.id ]: {
					...current,
					searches: {
						...current.searches,
						...action.payload,
					},
					loading: false,
				},
			};
		}
		case 'SET_POST': {
			const current = state[ action.id ];
			return {
				...state,
				[ action.id ]: {
					...current,
					...DEFAULT_BLOCK,
					post: {
						...current.post,
						...action.payload,
					},
				},
			};
		}
		case 'SET_DRAFT_TITLE': {
			const current = state[ action.id ];
			return {
				...state,
				[ action.id ]: {
					...current,
					create: true,
					edit: false,
					loading: false,
					submit: false,
					draft: {
						title: action.title,
					},
				},
			};
		}
		case 'SET_DRAFT_POST': {
			const current = state[ action.id ];
			return {
				...state,
				[ action.id ]: {
					...current,
					create: false,
					edit: true,
					loading: false,
					submit: false,
					draft: toFields( action.payload ),
				},
			};
		}
		case 'CREATE_DRAFT':
			return createDraft( state, action.id, action.payload );
		case 'EDIT_POST':
			return editPost( state, action.id, action.payload );
		case 'CLEAR':
			return {
				...state,
				[ action.id ]: {
					...DEFAULT_BLOCK,
				},
			};
		default:
			return state;
	}
}

function searchByTerm( prevState, id, payload ) {
	const { params, search } = payload;
	const block = prevState[ id ];

	if ( ! block ) {
		return prevState;
	}

	const query = apiArgs( {
		search,
		...params,
	} );

	apiRequest( {
		path: `/wp/v2/${ POST_TYPE }?${ stringify( query ) }`,
	} ).then( ( body ) => {
		// Prevent responses from old searches to be stored.
		const current = select( STORE_NAME ).getSearch( id );
		if ( current.trim() !== search.trim() ) {
			return;
		}

		store.dispatch( {
			type: 'SET_RESULTS',
			id,
			payload: {
				results: body,
				search,
			},
		} );
	} );

	const current = prevState[ id ];
	return {
		...prevState,
		[ id ]: {
			...current,
			loading: true,
			searches: {
				results: [],
				search,
			},
		},
	};
}

function createDraft( prevState, id, payload ) {
	const current = prevState[ id ];

	apiRequest( {
		path: `/wp/v2/${ POST_TYPE }`,
		method: 'POST',
		data: toOrganizer( payload ),
	} ).then( ( body ) => {
		store.dispatch( {
			type: 'ADD_ORGANIZER',
			block: id,
			organizer: body.id,
		} );

		store.dispatch( {
			type: 'SET_POST',
			id,
			payload: body,
		} );
	} );

	return {
		...prevState,
		[ id ]: {
			...current,
			draft: payload,
			edit: false,
			create: true,
			submit: true,
			loading: true,
		},
	};
}

function editPost( prevState, id, payload ) {
	const current = prevState[ id ];
	const { post } = current;

	if ( ! post.id ) {
		console.warn( 'There are no post associated with this draft' );
		return prevState;
	}

	apiRequest( {
		path: `/wp/v2/${ POST_TYPE }/${ post.id }`,
		method: 'PUT',
		data: toOrganizer( payload ),
	} ).then( ( body ) => {
		store.dispatch( {
			type: 'ADD_ORGANIZER',
			block: id,
			organizer: body.id,
		} );

		store.dispatch( {
			type: 'SET_POST',
			id,
			payload: body,
		} );
	} );

	return {
		...prevState,
		[ id ]: {
			...current,
			draft: payload,
			create: false,
			edit: true,
			submit: true,
			loading: true,
		},
	};
}

export function organizers( state = [], action ) {
	switch ( action.type ) {
		case 'ADD_ORGANIZER':
			return [
				...state,
				{
					id: action.block,
					organizer: action.organizer,
				},
			];
		case 'REMOVE_ORGANIZER':
			return state.filter( ( item ) => {
				return action.block !== item.id && action.organizer !== item.organizers;
			} );
		default:
			return state;
	}
}
