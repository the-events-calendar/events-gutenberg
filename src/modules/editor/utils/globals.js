export const get = ( key ) => window[ key ];
export const google = () => get( 'google' );
export const mapsAPI = () => get( 'tribe_blocks_editor_google_maps_api' );
export const settings = () => get( 'tribe_blocks_editor_settings' );
export const list = () => ( {
	countries: get( 'tribe_data_countries' ),
	us_states: get( 'tribe_data_us_states' ),
} );
