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

const RadioInput = ( { options, onChange, selectedValue } ) => {
	return (
		<fieldset className="tribe-editor__additional-fields__edit--horizontal-fields">
			{ options.map( ( option, index ) => {
				const { label = '', value = '' } = option;
				const name = normalize( label );
				const id = `name-${ index + 1 }`;
				const isChecked = value === selectedValue;
				return (
					<Fragment key={ id }>
						<input
							type="radio"
							id={ id }
							name={ name }
							value={ value }
							checked={ isChecked }
							onChange={ onChange }
						/>
						<label htmlFor={ id }>{ label }</label>
					</Fragment>
				);
			} ) }
		</fieldset>
	);
};

const RadioField = ( { name, value, options, onInputChange, ...rest } ) => (
	<Field
		name={ name }
		input={ <RadioInput selectedValue={ value } onChange={ onInputChange } options={ options } /> }
		output={ value }
		{ ...rest }
	/>
);

RadioField.propTypes = {
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

RadioField.defaultProps = {
	isPristine: true,
	isSelected: false,
	/**
	 * @todo remove placeholder options with data from store
	 */
	value: 'vanilla',
	options: [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	],
};

export default RadioField;
