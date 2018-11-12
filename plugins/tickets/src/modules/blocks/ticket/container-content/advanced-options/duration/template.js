/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { DateTimeRangePicker, LabelWithTooltip } from '@moderntribe/tickets/elements';
import './style.pcss';

const TicketDuration = ( props ) => (
	<div className="tribe-editor__ticket__duration">
		<LabelWithTooltip
			className="tribe-editor__ticket__duration-label-with-tooltip"
			label={ __( 'Sale Duration', 'events-gutenberg' ) }
			tooltipText={ __(
				'If you do not set a start sale date, tickets will be available immediately.',
				'events-gutenberg',
			) }
			tooltipLabel={ <Dashicon icon="info-outline" /> }
		/>
		<DateTimeRangePicker { ...props } />
	</div>
);

TicketDuration.propTypes = {
	fromDate: PropTypes.string,
	fromDateDisabled: PropTypes.bool,
	fromTime: PropTypes.string,
	fromTimeDisabled: PropTypes.bool,
	isSameDay: PropTypes.bool,
	onFromDateChange: PropTypes.func,
	onFromTimePickerChange: PropTypes.func,
	onFromTimePickerClick: PropTypes.func,
	onToDateChange: PropTypes.func,
	onToTimePickerChange: PropTypes.func,
	onToTimePickerClick: PropTypes.func,
	toDate: PropTypes.string,
	toDateDisabled: PropTypes.bool,
	toTime: PropTypes.string,
	toTimeDisabled: PropTypes.bool,
};

export default TicketDuration;