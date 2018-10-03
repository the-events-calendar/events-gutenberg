/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Input from '@moderntribe/events-pro/elements/input/element';

/**
 * @todo this needs to be moved to common once event tickets is merged
 */
const NumberInput = ( {
	className,
	max,
	min,
	step,
	...props
} ) => (
	<Input
		className={ classNames( 'tribe-editor__input--number', className ) }
		max={ max }
		min={ min }
		step={ step }
		type="number"
		{ ...props }
	/>
);

NumberInput.propTypes = {
	className: PropTypes.string,
	max: PropTypes.number,
	min: PropTypes.number,
	step: PropTypes.number,
};

export default NumberInput;
