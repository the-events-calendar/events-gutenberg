/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Field } from '@moderntribe/events-pro/blocks/additional-fields/elements';
import { UrlInput } from '@moderntribe/common/elements';

const URLField = ( { name, value, onInputChange, isSelected } ) => (
	<Field
		id={ name }
		input={ <UrlInput value={ value } onChange={ onInputChange } /> }
		output={ value }
		isSelected={ isSelected }
	/>
);

URLField.propTypes = {
	name: PropTypes.string,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.string,
};

URLField.defaultProps = {
	isSelected: false,
};

export default URLField;
