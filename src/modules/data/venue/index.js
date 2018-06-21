/**
 * Wordpress dependencies
 */
const { data } = wp;
const { registerStore } = data;

/**
 * Internal dependencies
 */
import * as reducers from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';
import * as resolvers from './resolvers';

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
		case 'SUBMIT': {
			return {
				...state,
				submit: true,
			};
		}
		case 'CREATE_DRAFT': {
			return reducers.createDraft( state, action.fields );
		}
		case 'EDIT_DRAFT': {
			return reducers.editDraft( state, action.id, action.fields );
		}
		case 'REMOVE_DRAFT': {
			return reducers.removeDraft( state, action.id );
		}
		case 'CLEAR': {
			return {
				...state,
				...DEFAULT_STATE,
			};
		}
		default: {
			return state;
		}
	}
};

export const store = registerStore( STORE_NAME, {
	reducer,
	actions,
	selectors,
	resolvers,
} );
