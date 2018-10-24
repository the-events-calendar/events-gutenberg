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

const DropdownField = ( { name, value, options, onInputChange, isSelected, output } ) => (
	<Field
		id={ name }
		input={ (
			<Select
				options={ options }
				value={ value }
				onChange={ onInputChange }
				isSearchable={ false }
				backspaceRemovesValue={ false }
			/>
		) }
		output={ output }
		isSelected={ isSelected }
	/>
);

DropdownField.propTypes = {
	name: PropTypes.string.isRequired,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.object,
	output: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			value: PropTypes.string,
			label: PropTypes.string,
		} ),
	),
};

DropdownField.defaultProps = {
	isSelected: false,
};

export default DropdownField;
