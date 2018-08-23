/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import { constants } from '@moderntribe/common/data/plugins';
import { PluginBlockHooks } from '@moderntribe/common/components';

const PLUGIN_TEMPLATES = {
	[ constants.EVENTS_PRO_PLUGIN ]: [
		[ 'tribe/event-pro-recurring', {}],
		[ 'tribe/event-pro-exception', {}],
		[ 'tribe/event-pro-recurring-add', {}],
		[ 'tribe/event-pro-exception-add', {}],
	],
};

const PluginDateTimeBlockHooks = ( {
	plugins,
} ) => {
	return (
		<PluginBlockHooks
			plugins={ plugins }
			pluginTemplates={ PLUGIN_TEMPLATES }
			templateLock="all"
		/>
	);
};

PluginDateTimeBlockHooks.propTypes = {
	plugins: PropTypes.arrayOf( PropTypes.string ).isRequired,
};

export default PluginDateTimeBlockHooks;
