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
	InMonth,
	OnDayOfMonthPicker,
	TypePicker,
	RecurringToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const YearlyField = ( { isMultiDay, typeOption, index } ) => {
	return (
		<Fragment>
			<TypePicker
				rowLabel={ __( 'Excluding', 'events-gutenberg' ) }
				options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
				selected={ typeOption }
				blockType={ constants.EXCEPTION }
				index={ index }
			/>
			<InMonth index={ index } />
			<OnDayOfMonthPicker index={ index } />
			<FromTimeRangePicker
				index={ index }
				blockType={ constants.EXCEPTION }
			/>
			{ isMultiDay && <RecurringToDateTimePicker index={ index } /> }
			<SeriesEnds
				rowLabel={ __( 'Exception ends', 'events-gutenberg' ) }
				blockType={ constants.EXCEPTION }
				index={ index }
			/>
		</Fragment>
	);
};

YearlyField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
	typeOption: proptypes.ReactSelectOption,
	index: PropTypes.number.isRequired,
};

export default YearlyField;
