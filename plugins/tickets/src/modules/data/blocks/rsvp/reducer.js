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
	enableNotGoing: false,
	startDate: momentUtil.toDate( moment() ),
	endDate: momentUtil.toDate( moment() ),
	startTime: momentUtil.toTime24Hr( moment() ),
	endTime: momentUtil.toTime24Hr( moment() ),
	created: false,
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
			}
		case types.SET_RSVP_ENABLE_NOT_GOING:
			return {
				...state,
				enableNotGoing: action.payload.enableNotGoing,
			}
		case types.SET_RSVP_START_DATE:
			return {
				...state,
				startDate: action.payload.startDate,
			}
		case types.SET_RSVP_END_DATE:
			return {
				...state,
				endDate: action.payload.endDate,
			}
		case types.SET_RSVP_START_TIME:
			return {
				...state,
				startTime: action.payload.startTime,
			}
		case types.SET_RSVP_END_TIME:
			return {
				...state,
				endTime: action.payload.endTime,
			}
		default:
			return state;
	}
};