/**
 * External dependencies
 */
import { get, has } from 'lodash';

/**
 * Internal dependencies
 */
import { settings as globalSettings } from 'utils/globals';

let settings = {};

/**
 * Module Code
 *
 * @return {object} An object with the global settings
 */
export function getSettings() {
	return globalSettings || {};
}

export function getSetting( key, defaultValue = undefined ) {
	return get( settings.getSettings(), key, defaultValue );
}

export function hasSetting( key ) {
	return has( settings.getSettings(), key );
}

settings = {
	getSettings,
	getSetting,
	hasSetting,
};

export default settings;
