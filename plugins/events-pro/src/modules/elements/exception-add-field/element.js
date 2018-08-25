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

const ExceptionAddField = ( props ) => {
	return (
		<AddField { ...props }>
			{ __( 'Add Exception', 'events-gutenberg' ) }
		</AddField>
	);
};

ExceptionAddField.propTypes = {};

export default ExceptionAddField;
