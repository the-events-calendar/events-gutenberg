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
	RecurrenceTypePicker,
	SingleToDateTimePicker,
} from '@moderntribe/events-pro/elements';

const SingularField = ( { isMultiDay } ) => {
	return (
		<Fragment>
			<RecurrenceTypePicker rowLabel={ __( 'Excluding', 'events-gutenberg' ) } />
			<OnDatePicker />
			<FromTimeRangePicker />
			{ isMultiDay && <SingleToDateTimePicker /> }
		</Fragment>
	);
};

SingularField.propTypes = {
	isMultiDay: PropTypes.bool.isRequired,
};

export default SingularField;
