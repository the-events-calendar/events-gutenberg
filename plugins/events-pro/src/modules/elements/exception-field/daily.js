/* eslint-disable camelcase */
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
	OnDatePicker,
	TypePicker,
	SingleToDateTimePicker,
	SeriesEnds,
} from '@moderntribe/events-pro/elements';
import { constants } from '@moderntribe/events-pro/data/blocks';
import { options } from '@moderntribe/events-pro/data/blocks/exception';

const DailyField = ( {
	handleStartDate,
	index,
	multi_day,
	start_date,
	start_time,
	end_time,
	typeOption,
} ) => {
	return (
		<Fragment>
			<TypePicker
				rowLabel={ __( 'Excluding', 'events-gutenberg' ) }
				options={ options.EXCEPTION_OCCURRENCE_OPTIONS }
				selected={ typeOption }
				blockType={ constants.EXCEPTION }
				index={ index }
			/>
			<SeriesEnds
				rowLabel={ __( 'Exception ends', 'events-gutenberg' ) }
				blockType={ constants.EXCEPTION }
				index={ index }
			/>
		</Fragment>
	);
};

DailyField.propTypes = {
	multi_day: PropTypes.bool.isRequired,
	typeOption: proptypes.ReactSelectOption,
	index: PropTypes.number.isRequired,
	start_date: PropTypes.string.isRequired,
	start_time: PropTypes.string.isRequired,
	end_time: PropTypes.string.isRequired,
	handleStartDate: PropTypes.func.isRequired,
};

export default DailyField;
