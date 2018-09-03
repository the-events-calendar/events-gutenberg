import PropTypes from 'prop-types';
import {
	ClockActive,
	ClockInactive,
	TicketActive,
	TicketInactive,
} from '@moderntribe/tickets/icons';

const TicketIcon = ( { unlimited, disabled } ) => (
	unlimited ?
		(
			disabled ? <ClockActive /> : <ClockInactive />
		)
		: (
			disabled ? <TicketActive /> : <TicketInactive />
		)
);


TicketIcon.defaultProps = {
	unlimited: false,
	disabled: false,
}

TicketIcon.propTypes = {
	unlimited: PropTypes.bool,
	disabled: PropTypes.bool,
}

export default TicketIcon;
