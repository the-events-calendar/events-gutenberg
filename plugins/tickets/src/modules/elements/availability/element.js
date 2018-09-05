/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { identity } from 'lodash';

/**
 * Internal dependencies
 */
import { numericLabel } from '@moderntribe/common/utils/string';
import './style.pcss';

const TicketAvailability = ( { available, total, separator, ...labels } ) => {
	const items = [
		numericLabel( {
			count: available, singular: labels.availableSingular, plural: labels.availablePlural,
		} ),
		numericLabel( {
			count: total, singular: labels.totalSingular, plural: labels.totalPlural,
		} ),
	].filter( identity )
		.join( separator );

	return (
		<div className="tribe-editor__availability">{ items }</div>
	);
};

TicketAvailability.propTypes = {
	available: PropTypes.number,
	total: PropTypes.number,
	availableSingular: PropTypes.string,
	availablePlural: PropTypes.string,
	totalSingular: PropTypes.string,
	totalPlural: PropTypes.string,
	separator: PropTypes.string,
}

TicketAvailability.defaultProps = {
	available: 0,
	total: 0,
	availableSingular: __( '%d ticket available', 'events-gutenberg' ),
	availablePlural: __( '%d tickets available', 'events-gutenberg' ),
	totalSingular: __( '%d total ticket', 'events-gutenberg' ),
	totalPlural: __( '%d total tickets', 'events-gutenberg' ),
	separator: ' | ',
};

export default TicketAvailability;
