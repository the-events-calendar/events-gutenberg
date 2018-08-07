/**
 * External dependencies
 */
import { get, has } from 'lodash';

/**
 * Module Code
 *
 * @return {object} An object with the global settings
 */
export function getSettings() {
	return window.tribe_blocks_editor_settings || {};
}

export function getSetting( key, defaultValue ) {
	return get( getSettings(), key, defaultValue );
}

export function hasSetting( key ) {
	return has( getSettings(), key );
}

export function getConstants() {
	return window.tribe_blocks_editor_constants || {};
}
