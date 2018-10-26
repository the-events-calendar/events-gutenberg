/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { normalize } from '@moderntribe/common/utils/string';
import { Field } from '@moderntribe/events-pro/blocks/additional-fields/elements';
import { Radio } from '@moderntribe/common/elements';
import './style.pcss';

const RadioInput = ( { options, onChange, selectedValue } ) => (
	<fieldset className="tribe-editor__additional-fields__edit--horizontal-fields">
		{ options.map( ( option, index ) => {
			const { label = '', value = '' } = option;
			const isChecked = value === selectedValue;
			return (
				<Radio
					checked={ isChecked }
					id={ `name-${ index + 1 }` }
					value={ value }
					onChange={ onChange }
					name={ normalize( label ) }
					label={ label }
					className={ 'tribe-editor__additional-fields__field--radio' }
				/>
			);
		} ) }
	</fieldset>
);

const RadioField = ( { name, value, output, options, onInputChange, isSelected } ) => (
	<Field
		id={ name }
		input={ <RadioInput selectedValue={ value } onChange={ onInputChange } options={ options } /> }
		output={ output }
		isSelected={ isSelected }
	/>
);

RadioField.propTypes = {
	name: PropTypes.string.isRequired,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.string,
	output: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			value: PropTypes.string,
			label: PropTypes.string,
		} ),
	),
};

RadioField.defaultProps = {
	isSelected: false,
};

export default RadioField;
