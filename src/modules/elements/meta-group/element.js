/**
 * External dependencies
 */
import React from 'react';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */

/**
 * Module Code
 */
class MetaGroup extends Component {
	static defaultProps = {
		className: '',
		children: null,
	};

	render() {
		const { groupKey, className, children } = this.props;

		const classNames = [
			'tribe-editor__meta-group',
			`tribe-editor__meta-group--${ groupKey }`,
			className,
		];
		return (
			<div
				className={ classNames }
				key={ groupKey }
			>
				{ children }
			</div>
		);
	}
}

export default MetaGroup;
