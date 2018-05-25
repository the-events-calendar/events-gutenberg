/**
 * External imports
 */

/**
 * Wordpress Imports
 */
import { dispatch } from '@wordpress/data';

const { data, apiRequest } = wp;
const { registerStore } = data;

/**
 * Internal imports
 */
import * as reducers from './reducer';

export const POST_TYPE = 'tribe_venue';
export const STORE_NAME = 'tec.venue';

const DEFAULT_STATE = {
	id: 0,
	details: {},
	address: {},
	coordinates: {},
	draft: {},
	edit: false,
	create: false,
	loading: false,
	submit: false,
	created: [],
};

const reducer = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'SET_DETAILS': {
			return reducers.setDetails( state, action.id, action.details );
		}
		case 'SET_DRAFT_TITLE': {
			return {
				...state,
				edit: false,
				create: true,
				details: {},
				draft: {
					...state.draft,
					title: {
						rendered: action.title,
					},
				},
			};
		}
		case 'SET_DRAFT_DETAILS': {
			return {
				...state,
				details: {},
				edit: true,
				create: false,
				submit: false,
				draft: {
					...state.draft,
					...action.draft,
				},
			};
		}
		case 'CREATE_DRAFT': {
			return reducers.createDraft(state, action.fields );
		}
		case 'EDIT_DRAFT': {
			return reducers.editDraft( state, action.id, action.fields );
		}
		case 'REGISTER_VENUE': {
			return {
				...state,
				created: [ ...state.created, action.id ],
			};
		}
		case 'CLEAR': {
			return {
				...state,
				...DEFAULT_STATE,
				created: state.created,
			};
		}
		default: {
			return state;
		}
	}
};

const actions = {
	setDetails( id, details ) {
		return {
			type: 'SET_DETAILS',
			id,
			details,
		};
	},
	registerVenue( id ) {
		return {
			type: 'REGISTER_VENUE',
			id,
		};
	},
};

const selectors = {
	getDetails( state, id ) {
		return state.details;
	},
};

const resolvers = {
	async getDetails( state, id ) {
		if ( state.id === id ) {
			return state.details;
		}

		apiRequest( { path: `/wp/v2/${ POST_TYPE }/${ id }` } )
			.then( ( body ) => {
				dispatch( STORE_NAME ).setDetails( body.id, body );
			} );

		return {
			...state,
			loading: true,
		};
	},
};

export const store = registerStore( STORE_NAME, {
	reducer,
	actions,
	selectors,
	resolvers,
} );
