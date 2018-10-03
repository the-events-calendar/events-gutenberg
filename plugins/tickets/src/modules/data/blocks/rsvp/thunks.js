/**
 * External dependencies
 */
import moment from 'moment';

/**
 * Internal dependencies
 */
import * as actions from './actions';
import { DEFAULT_STATE } from './reducers/header-image';
import { actions as requestActions } from '@moderntribe/common/store/middlewares/request';
import * as momentUtil from '@moderntribe/common/utils/moment';
import { toSeconds, TIME_FORMAT_HH_MM } from '@moderntribe/common/utils/time';
import * as utils from '@moderntribe/tickets/data/utils';

/**
 * @todo: until we can abstract out wpRequest() better, these should remain as a thunk
 */
const METHODS = {
	DELETE: 'DELETE',
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
};

const createOrUpdateRSVP = ( method ) => ( payload ) => ( dispatch ) => {
	const {
		title,
		description,
		capacity,
		notGoingResponses,
		startDateObj,
		startTime,
		endDateObj,
		endTime,
	} = payload;

	const startMoment = moment( startDateObj ).seconds(
		toSeconds( startTime, TIME_FORMAT_HH_MM )
	);
	const endMoment = moment( endDateObj ).seconds(
		toSeconds( endTime, TIME_FORMAT_HH_MM )
	);

	let path = `${ utils.RSVP_POST_TYPE }`;
	const body = {
		title,
		excerpt: description,
		meta: {
			[ utils.KEY_TICKET_CAPACITY ]: capacity,
			[ utils.KEY_TICKET_START_DATE ]: momentUtil.toDateTime( startMoment ),
			[ utils.KEY_TICKET_END_DATE ]: momentUtil.toDateTime( endMoment ),
			[ utils.KEY_TICKET_SHOW_NOT_GOING ]: notGoingResponses ? 'yes' : 'no',
		},
	};

	if ( method === METHODS.POST ) {
		body.status = 'publish';
		body.meta[ utils.KEY_RSVP_FOR_EVENT ] = `${ payload.postId }`;
		/* This is hardcoded value until we can sort out BE */
		body.meta[ utils.KEY_TICKET_SHOW_DESCRIPTION ] = 'yes';
		/* This is hardcoded value until we can sort out BE */
		body.meta[ utils.KEY_PRICE ] = '0';
	} else if ( method === METHODS.PUT ) {
		path += `/${ payload.id }`;
	}

	const options = {
		path,
		params: {
			method,
			body: JSON.stringify( body ),
		},
		actions: {
			start: () => dispatch( actions.setRSVPIsLoading( true ) ),
			success: ( { body } ) => {
				if ( method === METHODS.POST ) {
					dispatch( actions.setRSVPId( body.id ) );
				}
				dispatch( actions.setRSVPIsLoading( false ) );
			},
			error: () => dispatch( actions.setRSVPIsLoading( false ) ),
		},
	};

	dispatch( requestActions.wpRequest( options ) );
};

export const createRSVP = createOrUpdateRSVP( METHODS.POST );

export const updateRSVP = createOrUpdateRSVP( METHODS.PUT );

export const deleteRSVP = ( id ) => ( dispatch ) => {
	const path = `${ utils.RSVP_POST_TYPE }/${ id }`;
	const options = {
		path,
		params: {
			method: METHODS.DELETE,
		},
	};

	dispatch( requestActions.wpRequest( options ) );
};

export const getRSVP = ( postId, page = 1 ) => ( dispatch ) => {
	const path = `${ utils.RSVP_POST_TYPE }?per_page=100&page=${ page }`;

	const options = {
		path,
		params: {
			method: METHODS.GET,
		},
		actions: {
			start: () => dispatch( actions.setRSVPIsLoading( true ) ),
			success: ( { body, headers } ) => {
				const filteredRSVPs = body.filter( ( rsvp ) => (
					rsvp.meta[ utils.KEY_RSVP_FOR_EVENT ] == postId
				) );
				const totalPages = headers.get( 'x-wp-totalpages' );

				if ( filteredRSVPs.length ) {
					/* If RSVP for event exists in fetched data */
					/**
					 * @todo We are currently only fetching the first RSVP.
					 *       If an event has more than 1 RSVP set up from
					 *       the classic editor, only one will be displayed.
					 *       The strategy to handle this is is being worked on.
					 */
					const rsvp = filteredRSVPs[0];
					const startMoment = moment( rsvp.meta[ utils.KEY_TICKET_START_DATE ] );
					const endMoment = moment( rsvp.meta[ utils.KEY_TICKET_END_DATE ] );
					const capacity = rsvp.meta[ utils.KEY_TICKET_CAPACITY ] >= 0
						? rsvp.meta[ utils.KEY_TICKET_CAPACITY ]
						: '';
					const notGoingResponses = rsvp.meta[ utils.KEY_TICKET_SHOW_NOT_GOING ] == 'yes';

					dispatch( actions.createRSVP() );
					dispatch( actions.setRSVPId( rsvp.id ) );
					dispatch( actions.setRSVPDetails( {
						title: rsvp.title.rendered,
						description: rsvp.excerpt.raw,
						capacity,
						notGoingResponses,
						startDate: momentUtil.toDate( startMoment ),
						startDateObj: new Date( momentUtil.toDate( startMoment.clone().seconds( 0 ) ) ),
						endDate: momentUtil.toDate( endMoment ),
						endDateObj: new Date( momentUtil.toDate( endMoment.clone().seconds( 0 ) ) ),
						startTime: momentUtil.toTime24Hr( startMoment ),
						endTime: momentUtil.toTime24Hr( endMoment ),
					} ) );
					dispatch( actions.setRSVPTempDetails( {
						tempTitle: rsvp.title.rendered,
						tempDescription: rsvp.excerpt.raw,
						tempCapacity: capacity,
						tempNotGoingResponses: notGoingResponses,
						tempStartDate: momentUtil.toDate( startMoment ),
						tempStartDateObj: new Date( momentUtil.toDate( startMoment.clone().seconds( 0 ) ) ),
						tempEndDate: momentUtil.toDate( endMoment ),
						tempEndDateObj: new Date( momentUtil.toDate( endMoment.clone().seconds( 0 ) ) ),
						tempStartTime: momentUtil.toTime24Hr( startMoment ),
						tempEndTime: momentUtil.toTime24Hr( endMoment ),
					} ) );
					dispatch( actions.setRSVPIsLoading( false ) );
				} else if ( page < totalPages ) {
					/* If there are more pages */
					dispatch( getRSVP( postId, page + 1 ) );
				} else {
					/* Did not find RSVP */
					dispatch( actions.setRSVPIsLoading( false ) );
				}
			},
			error: () => dispatch( actions.setRSVPIsLoading( false ) ),
		},
	};

	dispatch( requestActions.wpRequest( options ) );
};

export const updateRSVPHeaderImage = ( postId, image ) => ( dispatch ) => {
	const path = `tribe_events/${ postId }`;
	const body = {
		meta: {
			[ utils.KEY_TICKET_HEADER ]: `${ image.id }`,
		},
	};

	const options = {
		path,
		params: {
			method: METHODS.PUT,
			body: JSON.stringify( body ),
		},
		actions: {
			start: () => dispatch( actions.setRSVPIsSettingsLoading( true ) ),
			success: () => {
				dispatch( actions.setRSVPHeaderImage( {
					id: image.id,
					alt: image.alt,
					src: image.sizes.medium.url,
				} ) );
				dispatch( actions.setRSVPIsSettingsLoading( false ) );
			},
			error: () => dispatch( actions.setRSVPIsSettingsLoading( false ) ),
		},
	};

	dispatch( requestActions.wpRequest( options ) );
};

export const deleteRSVPHeaderImage = ( postId ) => ( dispatch ) => {
	const path = `tribe_events/${ postId }`;
	const body = {
		meta: {
			[ utils.KEY_TICKET_HEADER ]: null,
		},
	};

	const options = {
		path,
		params: {
			method: METHODS.PUT,
			body: JSON.stringify( body ),
		},
		actions: {
			start: () => dispatch( actions.setRSVPIsSettingsLoading( true ) ),
			success: () => {
				dispatch( actions.setRSVPHeaderImage( {
					id: DEFAULT_STATE.id,
					alt: DEFAULT_STATE.alt,
					src: DEFAULT_STATE.src,
				} ) );
				dispatch( actions.setRSVPIsSettingsLoading( false ) );
			},
			error: () => dispatch( actions.setRSVPIsSettingsLoading( false ) ),
		},
	};

	dispatch( requestActions.wpRequest( options ) );
};

export const getRSVPHeaderImage = ( id ) => ( dispatch ) => {
	const path = `media/${ id }`;

	const options = {
		path,
		params: {
			method: METHODS.GET,
		},
		actions: {
			start: () => dispatch( actions.setRSVPIsSettingsLoading( true ) ),
			success: ( { body } ) => {
				dispatch( actions.setRSVPHeaderImage( {
					id: body.id,
					alt: body.alt_text,
					src: body.media_details.sizes.medium.source_url,
				} ) );
				dispatch( actions.setRSVPIsSettingsLoading( false ) );
			},
			error: () => dispatch( actions.setRSVPIsSettingsLoading( false ) ),
		},
	};

	dispatch( requestActions.wpRequest( options ) );
};
