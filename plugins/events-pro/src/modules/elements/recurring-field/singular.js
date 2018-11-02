/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	FromTimeRangePicker,
	OnDatePicker,
	RecurringToDateTimePicker,
	TypePicker,
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
				rowLabel={ __( 'A', 'events-gutenberg' ) }
			/>
			<OnDatePicker
				blockType={ constants.RECURRING }
				index={ index }
			/>
			<FromTimeRangePicker
				blockType={ constants.RECURRING }
				index={ index }
			/>
			{/* @todo: change this to <SingleToDateTimePicker /> once BE is set */}
			{ isMultiDay && <RecurringToDateTimePicker index={ index } /> }
		</Fragment>
	);
};

SingularField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
};

export default SingularField;
