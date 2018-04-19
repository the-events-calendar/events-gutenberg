/**
 * External dependencies
 */
import { get, has } from 'lodash';

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Module Code
 *
 * @return {object} An object with the global settings
 */
export function getSettings() {
	const settings = window.tribe_blocks_editor_settings || {};

	return settings;
}

export function getSetting( key, defaultValue = undefined ) {
	return get( getSettings(), key, defaultValue );
}

export function hasSetting( key ) {
	return has( getSettings(), key );
}
