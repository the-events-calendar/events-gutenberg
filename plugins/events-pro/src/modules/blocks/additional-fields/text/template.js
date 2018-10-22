/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Field } from '@moderntribe/events-pro/blocks/additional-fields/elements';

const TextField = ( { name, value, onInputChange, ...rest } ) => (
	<Field
		name={ name }
		input={ <input type="text" value={ value } onChange={ onInputChange } /> }
		output={ value }
		{ ...rest }
	/>
);

TextField.propTypes = {
	name: PropTypes.string.isRequired,
	isPristine: PropTypes.bool,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.string,
};

TextField.defaultProps = {
	isPristine: true,
	isSelected: false,
};

export default TextField;
