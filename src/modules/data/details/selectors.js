/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { DEFAULT_STATE } from './reducers/details';

const blockSelector = ( state, props ) => state.details[ props.name ];

export const getPostType = createSelector(
	[ blockSelector ],
	( block ) => block ? block.type : DEFAULT_STATE.type
);

export const getLoading = createSelector(
	[ blockSelector ],
	( block ) => block ? block.loading : DEFAULT_STATE.loading,
);

export const getDetails = createSelector(
	[ blockSelector ],
	( block ) => block ? block.details : DEFAULT_STATE.details,
);
