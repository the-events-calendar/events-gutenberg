/**
 * Internal dependencies
 */
import { actions } from '@moderntribe/tickets/data/blocks/rsvp';

export const setRSVPHeader = ( data ) => ( dispatch ) => {
	dispatch( actions.setRSVPTitle( data.title ) );
	dispatch( actions.setRSVPDescription( data.description ) );
};

export const setRSVPDetails = ( data ) => ( dispatch ) => {
	dispatch( actions.setRSVPCapacity( data.capacity ) );
	dispatch( actions.setRSVPNotGoingResponses( data.notGoingResponses ) );
	dispatch( actions.setRSVPStartDate( data.startDate ) );
	dispatch( actions.setRSVPStartTime( data.startTime) );
	dispatch( actions.setRSVPEndDate( data.endDate ) );
	dispatch( actions.setRSVPEndTime( data.endTime) );
};
