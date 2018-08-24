/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { map, filter, includes } from 'lodash';
import { InnerBlocks } from '@wordpress/editor';
import { select } from '@wordpress/data';

/**
 * Allows for dynamic plugin templates based on current plugins available
 * utilizing InnerBlocks api
 *
 * @export
 * @class PluginBlockHooks
 * @extends {PureComponent}
 */
export default class PluginBlockHooks extends PureComponent {
	static propTypes = {
		allowedBlocks: PropTypes.arrayOf( PropTypes.string ),
		layouts: PropTypes.oneOfType( [
			PropTypes.object,
			PropTypes.arrayOf( PropTypes.object ),
		] ),
		/**
		 * Plugins to be used
		 * TODO: Just connect this prop to tribe/common store
		*/
		plugins: PropTypes.arrayOf( PropTypes.string ).isRequired,
		/**
		 * Plugin template structure needed to properly
		 * register new templates for each plugin
		 *
		 *
		 * ```js
		 * {
		 *		'events': [
		 *			[ 'tribe/event-datetime', {}],
		 * 		],
		 *		'events-pro': [
		 *  		[ 'tribe/event-pro-recurring', {}],
		 *			[ 'tribe/event-pro-exclusion', {}],
		 *		],
		 *	}
		 *	```
		 */
		pluginTemplates: PropTypes.objectOf( PropTypes.arrayOf( PropTypes.array ) ),
		templateLock: PropTypes.oneOf( [
			'all',
			'insert',
			false,
		] ),
	}

	/**
	 * Registered block names from core
	 *
	 * @readonly
	 * @memberof PluginBlockHooks
	 * @returns {Array} block names
	 */
	get registeredBlockNames() {
		const blockTypes = select( 'core/blocks' ).getBlockTypes();
		return map( blockTypes, block => block.name );
	}

	/**
	 * Template for InnerBlocks
	 *
	 * @readonly
	 * @memberof PluginBlockHooks
	 * @returns {Array} template
	 */
	get template() {
		const blockNames = this.registeredBlockNames;
		return this.props.plugins.reduce( ( acc, plugin ) => {
			const pluginTemplate = this.props.pluginTemplates[ plugin ];
			if ( pluginTemplate ) {
				// Block needs to be registered, otherwise it's dropped
				const blockTemplates = filter( pluginTemplate, ( [ name ] ) => includes( blockNames, name ) ); // eslint-disable-line max-len
				return [
					...acc,
					...blockTemplates,
				];
			}
			return acc;
		}, [] );
	}

	render() {
		return (
			<InnerBlocks
				allowedBlocks={ this.props.allowedBlocks }
				layouts={ this.props.layouts }
				template={ this.template }
				templateLock={ this.props.templateLock }
			/>
		);
	}
}
