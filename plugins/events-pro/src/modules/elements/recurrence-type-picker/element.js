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
import { LabeledRow } from '@moderntribe/events-pro/elements';
import { constants, options } from '@moderntribe/events-pro/data/blocks/recurring';
import './style.pcss';

const RecurrenceTypePicker = ( {
	className,
	onRecurrenceTypeChange,
	recurrenceType,
} ) => {
	const getLabel = () => (
		recurrenceType.value === constants.SINGLE
			? __( 'A', 'events-gutenberg' )
			: __( 'Every', 'events-gutenberg' )
	);

	const getFrequencySelect = () => (
		recurrenceType.value !== constants.SINGLE
			&& (
				<FrequencySelect
					className="tribe-editor__recurrence-type-picker__recurrence-frequency-select"
				/>
			)
	);

	return (
		<LabeledRow
			className={ classNames( 'tribe-editor__recurrence-type-picker', className ) }
			label={ getLabel() }
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
	className: PropTypes.string,
	onRecurrenceTypeChange: PropTypes.func,
	recurrenceType: PropTypes.oneOf( options.RECURRENCE_TYPE_RULES_OPTIONS ),
};

export default RecurrenceTypePicker;
