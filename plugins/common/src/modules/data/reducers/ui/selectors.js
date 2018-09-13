/**
 * External dependencies
 */
import { createSelector } from 'reselect';

export const getUi = ( state ) => state.ui;

export const getAccordionId = ( state, props ) => props.id;

export const getAccordions = createSelector(
	[ getUi ],
	( ui ) => ui.accordion,
);

export const getAccordionState = createSelector(
	[ getAccordions, getAccordionId ],
	( accordions, accordionId ) => accordions[ accordionId ],
);
