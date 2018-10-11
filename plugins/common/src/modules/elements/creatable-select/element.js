/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { components } from 'react-select';
import ReactCreatableSelect from 'react-select/lib/Creatable';
import { Dashicon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.pcss';

const DropdownIndicator = ( props ) => (
	components.DropdownIndicator && (
		<components.DropdownIndicator { ...props }>
			<Dashicon
				className="tribe-editor__creatable-select__dropdown-indicator"
				icon={ 'arrow-down' }
			/>
		</components.DropdownIndicator>
	)
);

const IndicatorSeparator = () => null;

const CreatableSelect = ( { className, ...rest } ) => (
	<ReactCreatableSelect
		className={ classNames( 'tribe-editor__creatable-select', className ) }
		classNamePrefix="tribe-editor__creatable-select"
		components={ { DropdownIndicator, IndicatorSeparator } }
		{ ...rest }
	/>
);

CreatableSelect.propTypes = {
	className: PropTypes.string,
};

export default CreatableSelect;
