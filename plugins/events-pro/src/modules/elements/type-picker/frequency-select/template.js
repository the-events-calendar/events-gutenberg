/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { proptypes } from '@moderntribe/common/data/plugins';

/**
 * Internal dependencies
 */
import { CreatableSelect } from '@moderntribe/common/elements';
import './style.pcss';

const FrequencySelect = ( {
	className,
	frequency,
	onChange,
	options,
} ) => {
	const formatCreateLabel = ( inputValue ) => inputValue;

	const isValidNewOption = ( inputValue, selectValue, selectOptions ) => {
		const isNotDuplicated = ! selectOptions
			.filter( ( option ) => option.label === inputValue )
			.length;
		const isNotEmpty = inputValue !== '';
		const isNumber = ! isNaN( inputValue );
		return isNotEmpty && isNotDuplicated && isNumber;
	};

	return (
		<CreatableSelect
			className={ classNames(
				'tribe-editor__frequency-select',
				className,
			) }
			backspaceRemovesValue={ false }
			formatCreateLabel={ formatCreateLabel }
			isValidNewOption={ isValidNewOption }
			onChange={ onChange }
			options={ options }
			value={ frequency }
		/>
	);
};

FrequencySelect.propTypes = {
	className: PropTypes.string,
	frequency: proptypes.ReactSelectOption.isRequired,
	onChange: PropTypes.func.isRequired,
	options: proptypes.ReactSelectOptions.isRequired,
};

export default FrequencySelect;
