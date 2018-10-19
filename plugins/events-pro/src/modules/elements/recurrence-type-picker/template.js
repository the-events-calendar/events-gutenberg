/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import FrequencySelect from './frequency-select/element';
import { Select } from '@moderntribe/common/elements';
import LabeledRow from '@moderntribe/events-pro/elements/labeled-row/element';
import { constants } from '@moderntribe/events-pro/data/blocks';
import {
	constants as recurringConstants,
	options,
} from '@moderntribe/events-pro/data/blocks/recurring';
import './style.pcss';

const RecurrenceTypePicker = ( {
	blockType,
	className,
	index,
	onRecurrenceTypeChange,
	recurrenceType,
	rowLabel,
} ) => {
	const getLabel = () => (
		recurrenceType.value === recurringConstants.SINGLE
			? __( 'A', 'events-gutenberg' )
			: __( 'Every', 'events-gutenberg' )
	);

	const getFrequencySelect = () => (
		recurrenceType.value !== recurringConstants.SINGLE
			&& (
				<FrequencySelect
					className="tribe-editor__recurrence-type-picker__recurrence-frequency-select"
					blockType={ blockType }
					index={ index }
				/>
			)
	);

	return (
		<LabeledRow
			className={ classNames( 'tribe-editor__recurrence-type-picker', className ) }
			label={ rowLabel || getLabel() }
		>
			{ getFrequencySelect() }
			<Select
				className="tribe-editor__recurrence-type-picker__recurrence-type-select"
				backspaceRemovesValue={ false }
				value={ recurrenceType }
				isSearchable={ false }
				options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
				onChange={ onRecurrenceTypeChange }
			/>
		</LabeledRow>
	);
}

RecurrenceTypePicker.propTypes = {
	blockType: PropTypes.oneOf( constants.BLOCK_TYPES ),
	className: PropTypes.string,
	index: PropTypes.number,
	onRecurrenceTypeChange: PropTypes.func,
	recurrenceType: PropTypes.oneOf( options.RECURRENCE_TYPE_RULES_OPTIONS ),
	rowLabel: PropTypes.string,
};

export default RecurrenceTypePicker;
