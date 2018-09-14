/**
 * External dependencies
 */
import { createSelector } from 'reselect';

export const getUI = ( state ) => state.ui;

export const getAccordionId = ( state, ownProps ) => ownProps.accordionId;

export const getAccordions = createSelector(
	[ getUI ],
	( ui ) => ui.accordion,
);

export const getAccordionState = createSelector(
	[ getAccordions, getAccordionId ],
	( accordions, accordionId ) => accordions[ accordionId ],
);
