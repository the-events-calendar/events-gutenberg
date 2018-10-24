/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Field } from '@moderntribe/events-pro/blocks/additional-fields/elements';
import {
	Paragraph,
	Textarea,
} from '@moderntribe/common/elements';

const TextAreaField = ( { name, value, onInputChange, output, isSelected } ) => {
	const paragraphs = output.map( ( paragraph, index ) => (
		<Paragraph key={ `textarea-${ name }-${ index + 1 }` }>{ paragraph }</Paragraph>
	) );
	return (
		<Field
			id={ name }
			input={ <Textarea rows="5" wrap="hard" value={ value } onChange={ onInputChange } /> }
			output={ paragraphs }
			isSelected={ isSelected }
		/>
	);
};

TextAreaField.propTypes = {
	name: PropTypes.string.isRequired,
	isSelected: PropTypes.bool,
	onInputChange: PropTypes.func,
	value: PropTypes.string,
	output: PropTypes.arrayOf( PropTypes.string ),
};

TextAreaField.defaultProps = {
	isSelected: false,
};

export default TextAreaField;
