/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Field } from '@moderntribe/events-pro/blocks/additional-fields/elements';
import { Select } from '@moderntribe/common/elements';

const DropdownField = ( { name, value, options, onInputChange, ...rest } ) => (
	<Field
		name={ name }
		input={ <Select options={ options } value={ value } onChange={ onInputChange } /> }
		output={ value }
		{ ...rest }
	/>
);

DropdownField.propTypes = {
	name: PropTypes.string.isRequired,
	isPristine: PropTypes.bool,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			value: PropTypes.string,
			label: PropTypes.string,
		} ),
	),
};

DropdownField.defaultProps = {
	isPristine: true,
	isSelected: false,
	/**
	 * @todo remove placeholder options with data from the store
	 */
	options: [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	],
};

export default DropdownField;
