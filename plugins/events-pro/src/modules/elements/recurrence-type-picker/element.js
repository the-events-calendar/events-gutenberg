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
import { Select } from '@moderntribe/common/elements';
import { LabeledRow } from '@moderntribe/events-pro/elements';
import { constants, options } from '@moderntribe/events-pro/data/blocks/recurring';
import './style.pcss';

const { DAILY, WEEKLY, MONTHLY, YEARLY, SINGLE } = constants;
const {
	RECURRENCE_TYPE_RULES_OPTIONS,
	DAILY_RECURRENCE_FREQUENCY_OPTIONS,
	WEEKLY_RECURRENCE_FREQUENCY_OPTIONS,
	MONTHLY_RECURRENCE_FREQUENCY_OPTIONS,
	YEARLY_RECURRENCE_FREQUENCY_OPTIONS,
} = options;

const RecurrenceTypePicker = ( {
	className,
	onRecurrenceFrequencyChange,
	onRecurrenceTypeChange,
	recurrenceFrequency,
	recurrenceType,
} ) => {
	const getLabel = () => (
		recurrenceType.value === SINGLE
			? __( 'A', 'events-gutenberg' )
			: __( 'Every', 'events-gutenberg' )
	);

	const getFrequencyOptions = () => {
		let frequencyOptions = [];

		switch ( recurrenceType.value ) {
			case DAILY:
				frequencyOptions = DAILY_RECURRENCE_FREQUENCY_OPTIONS;
				break;
			case WEEKLY:
				frequencyOptions = WEEKLY_RECURRENCE_FREQUENCY_OPTIONS;
				break;
			case MONTHLY:
				frequencyOptions = MONTHLY_RECURRENCE_FREQUENCY_OPTIONS;
				break;
			case YEARLY:
				frequencyOptions = YEARLY_RECURRENCE_FREQUENCY_OPTIONS;
				break;
			default:
				break;
		};

		return frequencyOptions;
	}

	const getFrequencySelect = () => (
		recurrenceType.value !== SINGLE
			&& (
				<Select
					className="tribe-editor__recurrence-type-picker__recurrence-frequency-select"
					backspaceRemovesValue={ false }
					value={ recurrenceFrequency }
					isSearchable={ true }
					options={ getFrequencyOptions() }
					onChange={ onRecurrenceFrequencyChange }
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
				options={ RECURRENCE_TYPE_RULES_OPTIONS }
				onChange={ onRecurrenceTypeChange }
			/>
		</LabeledRow>
	);
}

RecurrenceTypePicker.propTypes = {
	className: PropTypes.string,
	onRecurrenceFrequencyChange: PropTypes.func,
	onRecurrenceTypeChange: PropTypes.func,
	recurrenceFrequency: PropTypes.shape( {
		label: PropTypes.number,
		value: PropTypes.number,
	} ),
	recurrenceType: PropTypes.oneOf( RECURRENCE_TYPE_RULES_OPTIONS ),
};

export default RecurrenceTypePicker;
