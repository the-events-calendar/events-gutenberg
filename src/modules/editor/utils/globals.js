/**
 * Internal dependencies
 */
import { get } from 'lodash';

export const global = window || {};

export const google = get( global, 'google', null );
export const mapsAPI = get( global, 'tribe_blocks_editor_google_maps_api', {} );
export const settings = get( global, 'tribe_blocks_editor_settings', {} );
export const list = {
	countries: get( global, 'tribe_data_countries', {} ),
	us_states: get( global, 'tribe_data_us_states', {} ),
};
