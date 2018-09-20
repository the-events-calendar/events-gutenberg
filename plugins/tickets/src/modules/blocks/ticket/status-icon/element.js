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

const StatusIcon = ( { expires, disabled } ) => {
	if ( expires ) {
		return disabled ? <TicketInactive /> : <TicketActive />;
	}
	return disabled ? <ClockInactive /> : <ClockActive />;
};

StatusIcon.defaultProps = {
	expires: false,
	disabled: false,
}

StatusIcon.propTypes = {
	expires: PropTypes.bool,
	disabled: PropTypes.bool,
}

export default StatusIcon;
