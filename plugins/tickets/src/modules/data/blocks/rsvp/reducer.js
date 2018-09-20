/**
 * External dependencies
 */
import moment from 'moment/moment';

/**
 * Internal dependencies
 */
import { types } from '@moderntribe/tickets/data/blocks/rsvp';
import { moment as momentUtil } from '@moderntribe/common/utils';

export const DEFAULT_STATE = {
	title: '',
	description: '',
	capacity: '',
	notGoingResponses: false,
	startDate: momentUtil.toDate( moment() ),
	endDate: momentUtil.toDate( moment() ),
	startTime: momentUtil.toTime24Hr( moment() ),
	endTime: momentUtil.toTime24Hr( moment() ),
	tempTitle: '',
	tempDescription: '',
	tempCapacity: '',
	tempNotGoingResponses: false,
	tempStartDate: momentUtil.toDate( moment() ),
	tempStartDateObj: new Date( momentUtil.toDate( moment() ) ),
	tempEndDate: momentUtil.toDate( moment() ),
	tempEndDateObj: new Date( momentUtil.toDate( moment() ) ),
	tempStartTime: momentUtil.toTime24Hr( moment() ),
	tempEndTime: momentUtil.toTime24Hr( moment() ),
	created: false,
	settingsOpen: false,
	hasChanges: false,
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.CREATE_RSVP:
			return {
				...state,
				created: true,
			};
		case types.DELETE_RSVP:
			return DEFAULT_STATE;
		case types.SET_RSVP_TITLE:
			return {
				...state,
				title: action.payload.title,
			};
		case types.SET_RSVP_DESCRIPTION:
			return {
				...state,
				description: action.payload.description,
			};
		case types.SET_RSVP_CAPACITY:
			return {
				...state,
				capacity: action.payload.capacity,
			};
		case types.SET_RSVP_NOT_GOING_RESPONSES:
			return {
				...state,
				notGoingResponses: action.payload.notGoingResponses,
			};
		case types.SET_RSVP_START_DATE:
			return {
				...state,
				startDate: action.payload.startDate,
			};
		case types.SET_RSVP_END_DATE:
			return {
				...state,
				endDate: action.payload.endDate,
			};
		case types.SET_RSVP_START_TIME:
			return {
				...state,
				startTime: action.payload.startTime,
			};
		case types.SET_RSVP_END_TIME:
			return {
				...state,
				endTime: action.payload.endTime,
			};
		case types.SET_RSVP_TEMP_TITLE:
			return {
				...state,
				tempTitle: action.payload.tempTitle,
			};
		case types.SET_RSVP_TEMP_DESCRIPTION:
			return {
				...state,
				tempDescription: action.payload.tempDescription,
			};
		case types.SET_RSVP_TEMP_CAPACITY:
			return {
				...state,
				tempCapacity: action.payload.tempCapacity,
			};
		case types.SET_RSVP_TEMP_NOT_GOING_RESPONSES:
			return {
				...state,
				tempNotGoingResponses: action.payload.tempNotGoingResponses,
			};
		case types.SET_RSVP_TEMP_START_DATE:
			return {
				...state,
				tempStartDate: action.payload.tempStartDate,
			};
		case types.SET_RSVP_TEMP_START_DATE_OBJ:
			return {
				...state,
				tempStartDateObj: action.payload.tempStartDateObj,
			};
		case types.SET_RSVP_TEMP_END_DATE:
			return {
				...state,
				tempEndDate: action.payload.tempEndDate,
			};
		case types.SET_RSVP_TEMP_END_DATE_OBJ:
			return {
				...state,
				tempEndDateObj: action.payload.tempEndDateObj,
			};
		case types.SET_RSVP_TEMP_START_TIME:
			return {
				...state,
				tempStartTime: action.payload.tempStartTime,
			};
		case types.SET_RSVP_TEMP_END_TIME:
			return {
				...state,
				tempEndTime: action.payload.tempEndTime,
			};
		case types.SET_RSVP_SETTINGS_OPEN:
			return {
				...state,
				settingsOpen: action.payload.settingsOpen,
			};
		case types.SET_RSVP_HAS_CHANGES:
			return {
				...state,
				hasChanges: action.payload.hasChanges,
			};
		default:
			return state;
	}
};
