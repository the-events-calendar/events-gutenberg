/**
 * Internal dependencies
 */
import details, {
	DEFAULT_STATE as DETAILS_DEFAULT_STATE,
} from './reducers/details';
import tempDetails, {
	DEFAULT_STATE as TEMP_DETAILS_DEFAULT_STATE,
} from './reducers/temp-details';
import headerImage, {
	DEFAULT_STATE as HEADER_IMAGE_DEFAULT_STATE,
} from './reducers/header-image';
import { types } from '@moderntribe/tickets/data/blocks/rsvp';

export const DEFAULT_STATE = {
	id: 0,
	created: false,
	settingsOpen: false,
	hasChanges: false,
	isLoading: false,
	isSettingsLoading: false,
	details: DETAILS_DEFAULT_STATE,
	tempDetails: TEMP_DETAILS_DEFAULT_STATE,
	headerImage: HEADER_IMAGE_DEFAULT_STATE,
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
		case types.SET_RSVP_ID:
			return {
				...state,
				id: action.payload.id,
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
		case types.SET_RSVP_IS_LOADING:
			return {
				...state,
				isLoading: action.payload.isLoading,
			};
		case types.SET_RSVP_IS_SETTINGS_LOADING:
			return {
				...state,
				isSettingsLoading: action.payload.isSettingsLoading,
			};
		case types.SET_RSVP_TITLE:
		case types.SET_RSVP_DESCRIPTION:
		case types.SET_RSVP_CAPACITY:
		case types.SET_RSVP_NOT_GOING_RESPONSES:
		case types.SET_RSVP_START_DATE:
		case types.SET_RSVP_START_DATE_OBJ:
		case types.SET_RSVP_END_DATE:
		case types.SET_RSVP_END_DATE_OBJ:
		case types.SET_RSVP_START_TIME:
		case types.SET_RSVP_END_TIME:
			return {
				...state,
				details: details( state.details, action ),
			};
		case types.SET_RSVP_TEMP_TITLE:
		case types.SET_RSVP_TEMP_DESCRIPTION:
		case types.SET_RSVP_TEMP_CAPACITY:
		case types.SET_RSVP_TEMP_NOT_GOING_RESPONSES:
		case types.SET_RSVP_TEMP_START_DATE:
		case types.SET_RSVP_TEMP_START_DATE_OBJ:
		case types.SET_RSVP_TEMP_END_DATE:
		case types.SET_RSVP_TEMP_END_DATE_OBJ:
		case types.SET_RSVP_TEMP_START_TIME:
		case types.SET_RSVP_TEMP_END_TIME:
			return {
				...state,
				tempDetails: tempDetails( state.tempDetails, action ),
			};
		case types.SET_RSVP_HEADER_IMAGE:
			return {
				...state,
				headerImage: headerImage( state.headerImage, action ),
			};
		default:
			return state;
	}
};
