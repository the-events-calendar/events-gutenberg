import { get, pick } from 'lodash';

const { data } = wp;
const { registerStore, combineReducers } = data;

import * as reducers from './reducers';

export const STORE_NAME = 'tec.organizer.blocks';
const details = {
	reducer: combineReducers( reducers ),
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
			const { organizers } = state;
			return organizers;
		},
	},
};
export const store = registerStore( STORE_NAME, details );
