/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Field } from '@moderntribe/events-pro/blocks/additional-fields/elements';

const TextAreaField = ( { name, value, onInputChange, ...rest } ) => (
	<Field
		name={ name }
		input={ <textarea rows="5" wrap="hard" value={ value } onChange={ onInputChange } /> }
		output={ value }
		{ ...rest }
	/>
);

TextAreaField.propTypes = {
	name: PropTypes.string.isRequired,
	isPristine: PropTypes.bool,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.string,
};

TextAreaField.defaultProps = {
	isPristine: true,
	isSelected: false,
};

export default TextAreaField;
