import { get, pick, map } from 'lodash';

import { select, dispatch } from '@wordpress/data';

const { apiRequest, data } = wp;
const { registerStore, combineReducers } = data;

import * as reducers from './reducers';
import { STORE_NAME as EVENT_DETAILS_STORE } from 'data/details';
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
	},
	selectors: {
		getBlock( state, id ) {
			const { blocks } = state;
			return blocks[ id ] || {};
		},
		getSearch( state, id ) {
			const { blocks } = state;
			const block = blocks[ id ];
			const searches = get( block, 'searches', {} );
			return get( searches, 'search', '' );
		},
		getPosts( state, id ) {
			const { blocks } = state;
			const block = blocks[ id ];
			const searches = get( block, 'searches', {} );
			return {
				...pick( block, [ 'loading' ] ),
				...searches,
			};
		},
		getOrganizers( state ) {
			const { blocks } = state;
			return map( blocks, ( block, id ) => {
				return {
					organizer: get( block, 'organizer', 0 ),
					index: select( 'core/editor' ).getBlockIndex( id ),
				};
			} );
		},
		getDetails( state, id, organizer ) {
			const block = state[ id ] || {};
			return block.post || {};
		}
	},
	resolvers: {
		async getDetails( state, id, organizer ) {
			if ( ! organizer ) {
				return state;
			}

			apiRequest( { path: `/wp/v2/${ POST_TYPE }/${ organizer }` } )
				.then( ( body ) => {
					dispatch( EVENT_DETAILS_STORE ).addOrganizer( {
						...body,
						block: 'individual',
					} );
					dispatch( STORE_NAME ).setPost( id, body );
				} );

			return state;
		}
	}
};
export const store = registerStore( STORE_NAME, details );
