/**
 * External Dependencies
 */
import { put, all, takeEvery } from 'redux-saga/effects';

/**
 * Internal dependencies
 */
import * as types from './types';
import * as actions from './actions';

export function* setRSVPHeader( action ) {
	const { title, description } = action.payload;
	yield all( [
		put( actions.setRSVPTitle( title ) ),
		put( actions.setRSVPDescription( description ) ),
	] );
}

export function* setRSVPDetails( action ) {
	const {
		capacity,
		notGoingResponses,
		startDate,
		startTime,
		endDate,
		endTime,
	} = action.payload;
	yield all( [
		put( actions.setRSVPCapacity( capacity ) ),
		put( actions.setRSVPNotGoingResponses( notGoingResponses ) ),
		put( actions.setRSVPStartDate( startDate ) ),
		put( actions.setRSVPStartTime( startTime) ),
		put( actions.setRSVPEndDate( endDate ) ),
		put( actions.setRSVPEndTime( endTime ) ),
	] );
}

export default function* watchers() {
	yield takeEvery( types.SET_RSVP_HEADER, setRSVPHeader );
	yield takeEvery( types.SET_RSVP_DETAILS, setRSVPDetails );
}
