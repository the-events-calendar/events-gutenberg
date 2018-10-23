/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

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

const SingularField = ( { isMultiDay, index } ) => {
	return (
		<Fragment>
			<TypePicker
				blockType={ constants.RECURRING }
				index={ index }
				options={ options.RECURRENCE_TYPE_RULES_OPTIONS }
			/>
			<OnDatePicker
				blockType={ constants.RECURRING }
				index={ index }
				blockType={ constants.RECURRING }
			/>
			<FromTimeRangePicker
				blockType={ constants.RECURRING }
				index={ index }
			/>
			{ isMultiDay && (
				<SingleToDateTimePicker
					blockType={ constants.RECURRING }
					index={ index }
				/>
			) }
		</Fragment>
	);
};

SingularField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
};

export default SingularField;
