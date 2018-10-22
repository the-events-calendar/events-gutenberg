/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Field } from '@moderntribe/events-pro/blocks/additional-fields/elements';

const URLField = ( { name, value, onInputChange, ...rest } ) => (
	<Field
		name={ name }
		input={ <input type="url" value={ value } onChange={ onInputChange } /> }
		output={ value }
		{ ...rest }
	/>
);

URLField.propTypes = {
	name: PropTypes.string.isRequired,
	isPristine: PropTypes.bool,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.string,
};

URLField.defaultProps = {
	isPristine: true,
	isSelected: false,
};

export default URLField;
