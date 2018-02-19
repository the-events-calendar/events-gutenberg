/**
 * External dependencies
 */

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
	static defaultProps = { className: '', children: null }

	constructor() {
		super( ...arguments );
	}

	render() {
		const { groupKey, className, children } = this.props;

		return (
			<div
				className={ `tribe-editor-meta-group tribe-editor-meta-group-${groupKey} ${className}` }
				key={ groupKey }
			>
				{ children }
			</div>
		)
	}
}
