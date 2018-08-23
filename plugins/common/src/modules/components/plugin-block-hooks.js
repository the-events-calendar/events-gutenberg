/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InnerBlocks } from '@wordpress/editor';

export default class PluginBlockHooks extends PureComponent {
	static propTypes = {
		allowedBlocks: PropTypes.arrayOf( PropTypes.string ),
		plugins: PropTypes.arrayOf( PropTypes.string ).isRequired,
		layouts: PropTypes.oneOfType( [
			PropTypes.object,
			PropTypes.arrayOf( PropTypes.object ),
		] ),
		templateLock: PropTypes.oneOf( [
			'all',
			'insert',
			false,
		] ),
		pluginTemplates: PropTypes.objectOf( PropTypes.arrayOf( PropTypes.array ) ),
	}

	get template() {
		return this.props.plugins.reduce( ( acc, plugin ) => {
			const pluginTemplate = this.props.pluginTemplates[ plugin ];
			if ( pluginTemplate ) {
				return [
					...acc,
					...pluginTemplate,
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
