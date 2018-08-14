/**
 * External dependencies
 */
import { isEmpty, difference } from 'lodash';

/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { selectors as formsSelectors } from '@moderntribe/events/data/forms';
import { DEFAULT_STATE } from './reducers/details';

export const blockSelector = ( state, props ) => state.details[ props.name ];

export const getPostType = createSelector(
	[ blockSelector ],
	( block ) => block ? block.postType : DEFAULT_STATE.postType
);

export const getIsLoading = createSelector(
	[ blockSelector ],
	( block ) => block ? block.isLoading : DEFAULT_STATE.isLoading,
);

export const getDetails = createSelector(
	[ blockSelector ],
	( block ) => block ? block.details : DEFAULT_STATE.details,
);

export const getVolatile = createSelector(
	[ getDetails, formsSelectors.getVolatile ],
	( details, volatileGroup ) => {
		if ( isEmpty( details ) ) {
			return false;
		}
		// Check if details.id is present on volatileGroup
		return difference( [ details.id ], volatileGroup ).length === 0;
	}
);
