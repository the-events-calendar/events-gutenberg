/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import './style.pcss';

const Button = ( {
	className,
	isDisabled,
	children,
	onClick,
	type,
	...props
} ) => (
	<button
		className={ classNames( 'tribe-editor__button', className ) }
		disabled={ isDisabled }
		type={ type }
		onClick={ onClick }
		{ ...props }
	>
		{ children }
	</button>
);

Button.defaultProps = {
	onClick: noop,
	type: 'button',
};

Button.propTypes = {
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	children: PropTypes.node,
	onClick: PropTypes.func,
	type: PropTypes.string,
};

export default Button;
