/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Field } from '@moderntribe/events-pro/blocks/additional-fields/elements';
import { Input } from '@moderntribe/common/elements';

const TextField = ( { isSelected, value, output, onInputChange, name } ) => (
	<Field
		id={ name }
		input={ <Input type="text" value={ value } onChange={ onInputChange } /> }
		output={ output }
		isSelected={ isSelected }
	/>
);

TextField.propTypes = {
	name: PropTypes.string,
	output: PropTypes.string,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.string,
};

TextField.defaultProps = {
	isSelected: false,
};

export default TextField;
