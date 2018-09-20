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

RSVPDurationPicker.propTypes = {

};

export default RSVPDurationPicker;
