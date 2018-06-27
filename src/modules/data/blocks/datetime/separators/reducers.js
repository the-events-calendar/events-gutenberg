/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getSetting } from 'editor/settings';
import * as types from './types';

const DEFAULT_STATE = {
	date: getSetting( 'dateTimeSeparator', __( ' @ ', 'events-gutenberg' ) ),
	time: getSetting( 'timeRangeSeparator', __( ' - ', 'events-gutenberg' ) ),
};

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case types.SET_SEPARATOR_DATE:
			return {
				...state,
				date: action.payload.separator,
			};
		case types.SET_SEPARATOR_TIME:
			return {
				...state,
				time: action.payload.separator,
			};
		default:
			return state;
	}
};
