/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Input from '@moderntribe/common/elements/input/element';

const CheckboxInput = ( {
	checked,
	className,
	onChange,
	...props
} ) => (
	<Input
		checked={ checked }
		className={ classNames( 'tribe-editor__input--checkbox', className ) }
		onChange={ onChange }
		type="checkbox"
		{ ...props }
	/>
);

CheckboxInput.propTypes = {
	checkbox: PropTypes.bool,
	className: PropTypes.string,
	onChange: PropTypes.func,
};

export default CheckboxInput;
