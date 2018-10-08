/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.pcss';

const Input = ( {
	className,
	type,
	...props,
} ) => (
	<input
		className={ classNames( 'tribe-editor__input', className ) }
		type={ type }
		{ ...props }
	/>
);

Input.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string.isRequired,
};

export default Input;
