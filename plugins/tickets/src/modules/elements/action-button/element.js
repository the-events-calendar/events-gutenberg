/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Button } from '@moderntribe/common/src/modules/elements';
import './style.pcss';

export const positions = {
	right: 'right',
	left: 'left',
};

const ActionButton = ( {
	children,
	className,
	icon,
	position,
	...props
} ) => {
	const containerClass = classNames(
		'tribe-editor__btn--label',
		'tribe-editor__tickets-btn--action',
		`tribe-editor__tickets-btn--action-${ position }`,
		className,
	);

	return (
		<Button
			className={ containerClass }
			{ ...props }
		>
			{ icon }
			<span className="tribe-editor__btn--label-children">{ children }</span>
		</Button>
	);
}

ActionButton.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	icon: PropTypes.node.isRequired,
	position: PropTypes.oneOf( Object.keys( positions ) ),
};

ActionButton.defaultProps = {
	position: positions.left,
}

export default ActionButton;
