/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LabeledItem = ( {
	className,
	label,
	children,
} ) => (
	<div className={ classNames(
		'tribe-editor__labeled-item',
		className,
	) }>
		<span className="tribe-editor__labeled-item__label">
			{ label }
		</span>
		{ children }
	</div>
);

LabeledItem.propTypes = {
	className: PropTypes.string,
	label: PropTypes.node,
	children: PropTypes.node.isRequired,
};

export default LabeledItem;
