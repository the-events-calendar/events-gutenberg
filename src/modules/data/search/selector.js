/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { DEFAULT_STATE } from './reducers/search';

const blockSelector = ( state, props ) => state.search[ props.name ];

export const getSearchTerm = createSelector(
	[ blockSelector ],
	( block ) => block ? block.term : DEFAULT_STATE.term
);

export const getLoading = createSelector(
	[ blockSelector ],
	( block ) => block ? block.loading : DEFAULT_STATE.loading,
);

export const getResults = createSelector(
	[ blockSelector ],
	( block ) => block ? block.results : [],
);
