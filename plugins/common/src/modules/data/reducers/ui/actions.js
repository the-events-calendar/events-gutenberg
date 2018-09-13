/**
 * Internal dependencies
 */
import { types } from '@moderntribe/common/data/reducers/ui';

export const openAccordion = ( id ) => ( {
	type: types.OPEN_ACCORDION,
	payload: {
		id,
	},
} );

export const closeAccordion = ( id ) => ( {
	type: types.CLOSE_ACCORDION,
	payload: {
		id,
	},
} );

export const addAccordion = ( id ) => ( {
	type: types.ADD_ACCORDION,
	payload: {
		id,
	},
} );

export const removeAccordion = ( id ) => ( {
	type: types.REMOVE_ACCORDION,
	payload: {
		id,
	},
} );
