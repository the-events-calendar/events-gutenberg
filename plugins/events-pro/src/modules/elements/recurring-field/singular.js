/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { proptypes } from '@moderntribe/common/data/plugins';

/**
 * Internal dependencies
 */
import {
	FromTimeRangePicker,
	OnDatePicker,
	TypePicker,
	SingleToDateTimePicker,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/recurring';

const SingularField = ( { isMultiDay, typeOption, onTypeChange, index } ) => {
	return (
		<Fragment>
			<TypePicker
				options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
				selected={ typeOption }
				onChange={ onTypeChange }
				blockType={ constants.RECURRING }
				index={ index }
			/>
			<OnDatePicker />
			<FromTimeRangePicker
				index={ index }
			/>
			{ isMultiDay && <SingleToDateTimePicker /> }
		</Fragment>
	);
};

SingularField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
	typeOption: proptypes.ReactSelectOption,
	onTypeChange: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};

export default SingularField;
