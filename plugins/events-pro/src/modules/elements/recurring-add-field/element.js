/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import AddField from '@moderntribe/events-pro/elements/add-field/element';

const RecurringAddField = ( props ) => {
	return (
		<AddField { ...props }>
			{ __( 'Add Rule', 'events-gutenberg' ) }
		</AddField>
	);
};

RecurringAddField.propTypes = {};

export default RecurringAddField;
