/**
 * External dependencies
 */
import React from 'react';

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

const TicketDurationPicker = ( props ) => {
	const { label, tooltip } = props;
	return (
		<div className="tribe-editor__container-panel__row">
			<LabelWithTooltip
				className="tribe-editor__container-panel__label"
				label={ label }
				tooltipText={ tooltip }
				tooltipLabel={ <Dashicon icon="info-outline" /> }
			/>
			<div className="tribe-editor__container-panel__input-group">
				<DateTimeRangePicker { ...props } />
			</div>
		</div>
	);
}

TicketDurationPicker.defaultProps = {
	className: 'tribe-editor__ticket-duration__duration-picker',
	fromDate: 'September 3, 2018',
	fromTime: '09:00',
	isSameDay: false,
	toDate: 'September 6, 2018',
	toTime: '15:00',
	onFromDateChange: () => {},
	onFromTimePickerChange: () => {},
	onFromTimePickerClick: () => {},
	onToDateChange: () => {},
	onToTimePickerChange: () => {},
	onToTimePickerClick: () => {},
	label: __( 'Sale Duration', 'events-gutenberg' ),
	tooltip: __(
		'If you do not set a start sale date, tickets will be available immediately.',
		'events-gutenberg'
	),
};

export default TicketDurationPicker;
