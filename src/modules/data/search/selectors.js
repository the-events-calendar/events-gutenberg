/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { DEFAULT_STATE } from './reducer';

export const blockSelector = ( state, props ) => state.search[ props.name ];

export const getSearchPostType = createSelector(
	[ blockSelector ],
	( block ) => block ? block.type : DEFAULT_STATE.postType
);

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
	( block ) => block ? block.results : DEFAULT_STATE.results,
);

export const getPage = createSelector(
	[ blockSelector ],
	( block ) => block ? block.page : DEFAULT_STATE.page,
);

export const getTotal = createSelector(
	[ blockSelector ],
	( block ) => block ? block.totalPages : DEFAULT_STATE.totalPages,
);
