/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Link = ( {
	children,
	className,
	href,
	target,
	...props,
} ) => (
	<a
		className={ classNames( 'tribe-editor__link', className ) }
		href={ href }
		target={ target }
		{ ...props }
	>
		{ children }
	</a>
);

Link.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	href: PropTypes.string.isRequired,
	target: PropTypes.string,
};

export default Link;
