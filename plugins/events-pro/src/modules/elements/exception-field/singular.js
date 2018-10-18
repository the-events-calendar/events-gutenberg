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
	OnDatePicker,
	RecurrenceTypePicker,
} from '@moderntribe/events-pro/elements';

const SingularField = () => {
	return (
		<Fragment>
			<RecurrenceTypePicker rowLabel={ __( 'Excluding', 'events-gutenberg' ) } />
			<OnDatePicker />
		</Fragment>
	);
};

SingularField.propTypes = {};

export default SingularField;
