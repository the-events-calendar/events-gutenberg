/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = ( {
	attrs,
	className,
	isDisabled,
	label,
	onClick,
	type,
} ) => (
	<button
		className={ classnames( 'tribe-editor__button', className ) }
		disabled={ isDisabled }
		type={ type }
		onClick={ onClick }
		{ ...attrs }
	>
		{ label }
	</button>
);

Button.defaultProps = {
	attrs: {},
	onClick: () => {},
	type: 'button',
};

Button.propTypes = {
	attrs: PropTypes.object,
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	label: PropTypes.node,
	onClick: PropTypes.func,
	type: PropTypes.string,
};

export default Button;
