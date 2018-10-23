/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Field } from '@moderntribe/events-pro/blocks/additional-fields/elements';

const TextField = ( { isSelected, value, onInputChange, name } ) => (
	<Field
		id={ name }
		input={ <input type="text" value={ value } onChange={ onInputChange } /> }
		output={ value }
		isSelected={ isSelected }
	/>
);

TextField.propTypes = {
	name: PropTypes.string,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.string,
};

TextField.defaultProps = {
	isSelected: false,
};

export default TextField;
