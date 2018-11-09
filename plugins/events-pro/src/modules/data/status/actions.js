/**
 * Internal dependencies
 */
import * as types from './types';

export const setSeriesQueueStatus = ( payload ) => ( {
	type: types.SET_SERIES_QUEUE_STATUS,
	payload,
} );
