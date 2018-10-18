/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { CreatableSelect } from '@moderntribe/common/elements';
import { constants, options } from '@moderntribe/events-pro/data/blocks/recurring';
import './style.pcss';

const { DAILY, WEEKLY, MONTHLY, YEARLY } = constants;
const {
	RECURRENCE_TYPE_RULES_OPTIONS,
	DAILY_RECURRENCE_FREQUENCY_OPTIONS,
	WEEKLY_RECURRENCE_FREQUENCY_OPTIONS,
	MONTHLY_RECURRENCE_FREQUENCY_OPTIONS,
	YEARLY_RECURRENCE_FREQUENCY_OPTIONS,
} = options;

const FrequencySelect = ( {
	className,
	onRecurrenceFrequencyChange,
	recurrenceFrequency,
	recurrenceType,
} ) => {
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
		}

		return frequencyOptions;
	};

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
			onChange={ onRecurrenceFrequencyChange }
			options={ getFrequencyOptions() }
			value={ recurrenceFrequency }
		/>
	);
};

FrequencySelect.propTypes = {
	className: PropTypes.string,
	onRecurrenceFrequencyChange: PropTypes.func,
	recurrenceFrequency: PropTypes.shape( {
		label: PropTypes.string,
		value: PropTypes.number,
	} ),
	recurrenceType: PropTypes.oneOf( RECURRENCE_TYPE_RULES_OPTIONS ),
};

export default FrequencySelect;
