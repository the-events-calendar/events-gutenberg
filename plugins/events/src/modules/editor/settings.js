/**
 * External dependencies
 */
import { get, has } from 'lodash';

/**
 * Module Code
 *
 * @return {object} An object with the global settings
 */
export const getSettings = () => (
	window.tribe_blocks_editor_settings || {}
);

export const getSetting = ( key, defaultValue ) => (
	get( getSettings(), key, defaultValue )
);

export const hasSetting = ( key ) => (
	has( getSettings(), key )
);

export const getConstants = () => (
	window.tribe_blocks_editor_constants || {}
);

export const getPriceSettings = () => (
	window.tribe_blocks_editor_price_settings || {}
);
