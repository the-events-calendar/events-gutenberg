/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = ( {
	className,
	isDisabled,
	label,
	onClick,
	type,
} ) => (
	<button
		className={ classnames( 'tribe-tickets__button', className ) }
		disabled={ isDisabled }
		type={ type }
		onClick={ onClick }
	>
		{ label }
	</button>
);

Button.defaultProps = {
	type: 'button',
	onClick: () => {},
};

Button.propTypes = {
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	label: PropTypes.node,
	onClick: PropTypes.func,
	type: PropTypes.string,
};

export default Button;
