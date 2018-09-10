/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { DateTimeRangePicker } from '@moderntribe/tickets/elements';
import './style.pcss';

const RSVPDurationPicker = ( props ) => (
	<DateTimeRangePicker { ...props } />
);

RSVPDurationPicker.defaultProps = {
	className: 'tribe-editor__rsvp-duration__duration-picker',
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
};

export default RSVPDurationPicker;
