/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import {
	ClockActive,
	ClockInactive,
	TicketActive,
	TicketInactive,
} from '@moderntribe/tickets/icons';

const TicketIcon = ( { expires, disabled } ) => {
	if ( expires ) {
		return disabled ? <TicketInactive /> : <TicketActive />;
	}
	return disabled ? <ClockInactive /> : <ClockActive />;
};

TicketIcon.defaultProps = {
	expires: false,
	disabled: false,
}

TicketIcon.propTypes = {
	expires: PropTypes.bool,
	disabled: PropTypes.bool,
}

export default TicketIcon;
