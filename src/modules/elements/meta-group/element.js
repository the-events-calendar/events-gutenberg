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
	static defaultProps = {
		className: '',
		children: null,
	};

	render() {
		const { groupKey, className, children } = this.props;

		return (
			<div
				className={ `tribe-editor__meta-group tribe-editor__meta-group--${ groupKey } ${ className }` }
				key={ groupKey }
			>
				{ children }
			</div>
		);
	}
}

export default MetaGroup;
