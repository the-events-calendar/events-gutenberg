/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { proptypes } from '@moderntribe/common/data/plugins';

/**
 * Internal dependencies
 */
import {
	FromTimeRangePicker,
	DayOfMonthPicker,
	TypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const MonthlyField = ( { isMultiDay, typeOption, onTypeChange } ) => {
	return (
		<Fragment>
			<TypePicker
				rowLabel={ __( 'Excluding', 'events-gutenberg' ) }
				options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
				selected={ typeOption }
				onChange={ onTypeChange }
			/>
			<DayOfMonthPicker />
			<FromTimeRangePicker />
			{ isMultiDay && <RecurringToDateTimePicker /> }
			<SeriesEnds rowLabel={ __( 'Exception ends', 'events-gutenberg' ) } />
		</Fragment>
	);
};

MonthlyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
	typeOption: proptypes.ReactSelectOption,
	onTypeChange: PropTypes.func.isRequired,
};

export default MonthlyField;
