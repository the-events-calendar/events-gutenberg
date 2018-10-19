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
import Settings from './settings';

const CheckboxInput = ( { options, onChange } ) => {
	return (
		<fieldset className="tribe-editor__additional-fields__edit--horizontal-fields">
			{ options.map( ( option, index ) => {
				const { label = '', value = '', isChecked = false } = option;
				const name = normalize( label );
				const id = `name-${ index + 1 }`;
				return (
					<Fragment key={ id }>
						<input
							type="checkbox"
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

const CheckboxField = ( { name, value, options, onInputChange, ...rest } ) => (
	<Field
		name={ name }
		input={ <CheckboxInput onChange={ onInputChange } options={ options } /> }
		output={ value }
		settings={ <Settings name={ name } /> }
		{ ...rest }
	/>
);

CheckboxField.propTypes = {
	name: PropTypes.string.isRequired,
	isPristine: PropTypes.bool,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			value: PropTypes.string,
			label: PropTypes.string,
			isChecked: PropTypes.bool,
		} ),
	),
};

CheckboxField.defaultProps = {
	isPristine: true,
	isSelected: false,
	/**
	 * @todo remove placeholder options with data from the store
	 */
	options: [
		{ value: 'chocolate', label: 'Chocolate', isChecked: false },
		{ value: 'strawberry', label: 'Strawberry', isChecked: false },
		{ value: 'vanilla', label: 'Vanilla', isChecked: true },
	],
};

export default CheckboxField;
