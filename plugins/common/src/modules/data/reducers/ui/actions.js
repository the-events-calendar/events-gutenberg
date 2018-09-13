/**
 * Internal dependencies
 */
import { types } from '@moderntribe/common/data/reducers/ui';

export const addAccordion = ( accordionId ) => ( {
	type: types.ADD_ACCORDION,
	payload: {
		accordionId,
	},
} );

export const removeAccordion = ( accordionId ) => ( {
	type: types.REMOVE_ACCORDION,
	payload: {
		accordionId,
	},
} );

export const toggleAccordion = ( accordionId ) => ( {
	type: types.TOGGLE_ACCORDION,
	payload: {
		accordionId,
	},
} );
