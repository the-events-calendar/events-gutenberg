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
} ) => (
	<button
		className={ classNames( 'tribe-editor__button', className ) }
		disabled={ isDisabled }
		type={ type }
		onClick={ onClick }
	>
		{ children }
	</button>
);

Button.defaultProps = {
	type: 'button',
	onClick: noop,
};

Button.propTypes = {
	className: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.arrayOf( PropTypes.string ),
		PropTypes.object,
	] ),
	isDisabled: PropTypes.bool,
	children: PropTypes.node,
	onClick: PropTypes.func,
	type: PropTypes.string,
};

export default Button;
