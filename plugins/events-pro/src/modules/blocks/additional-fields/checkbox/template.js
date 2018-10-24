/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { normalize } from '@moderntribe/common/utils/string';
import { Field } from '@moderntribe/events-pro/blocks/additional-fields/elements';
import { Checkbox } from '@moderntribe/common/elements';
import Settings from './settings/container';
import './style.pcss';

const CheckboxInput = ( { options, onChange } ) => (
	<fieldset className="tribe-editor__additional-fields__edit--horizontal-fields">
		{ options.map( ( option, index ) => {
			const { label = '', value = '', isChecked = false } = option;
			const name = normalize( label );
			const id = `name-${ index + 1 }`;
			return (
				<Checkbox
					id={ id }
					checked={ isChecked }
					onChange={ onChange }
					name={ name }
					value={ value }
					label={ label }
					className={ 'tribe-editor__additional-fields__field--checkbox' }
				/>
			);
		} ) }
	</fieldset>
);

const CheckboxField = ( { name, output, options, onInputChange, isSelected } ) => (
	<Field
		id={ name }
		input={ <CheckboxInput onChange={ onInputChange } options={ options } /> }
		output={ output }
		settings={ <Settings id={ name } /> }
		isSelected={ isSelected }
	/>
);

CheckboxField.propTypes = {
	name: PropTypes.string.isRequired,
	output: PropTypes.string,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			value: PropTypes.string,
			label: PropTypes.string,
			isChecked: PropTypes.bool,
		} ),
	),
};

CheckboxField.defaultProps = {
	isSelected: false,
};

export default CheckboxField;
