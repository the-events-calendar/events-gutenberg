/**
 * External dependencies
 */
import React from 'react';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { DateTimeRangePicker } from '@moderntribe/tickets/elements';
import './style.pcss';

const TicketDurationPicker = ( props ) => {
	const { label } = props;
	return (
		<div className="tribe-editor__tickets-form__row">
			<div className="tribe-editor__tickets-form__labels">
				<span>{ label }</span>
			</div>
			<div className="tribe-editor__tickets-form__input-group">
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
};

export default TicketDurationPicker;
