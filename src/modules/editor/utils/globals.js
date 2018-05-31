import { get } from 'lodash';

const global = window || {};

export const google = get( global, 'google', null );
export const mapsAPI = get( global, 'tribe_blocks_editor_google_maps_api', {} );
export const settings = get( global, 'tribe_blocks_editor_settings', {} );
