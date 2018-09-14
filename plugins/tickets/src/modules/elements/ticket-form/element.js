/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	Button,
} from '@moderntribe/common/elements';
import { DateTimeRangePicker } from '@moderntribe/tickets/elements';

import TicketFooter from './ticket-footer/template';
import TicketCapacity from './ticket-capacity';
import './style.pcss';

const TicketForm = ( props ) => {
	const {
		ticketCapacityLabel,
		ticketCapacityToolTip,
		attendeeRegistrationLabel,
		attendeeButtonLabel,
		createLabel,
		cancelLabel,
	} = props;
	return (
		<section className="tribe-editor__tickets-form">
			<div></div>
			<div className="tribe-editor__tickets-form__container">
				<div className="tribe-editor__tickets-form__body">
					<TicketCapacity label={ ticketCapacityLabel } tooltip={ ticketCapacityToolTip } />
					<div className="tribe-editor__tickets-attendee">
						<span>{ attendeeRegistrationLabel }</span>
						<Button className="tribe-editor__btn--label">{ attendeeButtonLabel }</Button>
					</div>
				</div>
				<TicketFooter { ...props } />
			</div>
		</section>
	);
};

TicketForm.propTypes = {
	ticketCapacityLabel: PropTypes.string,
	ticketCapacityToolTip: PropTypes.string,
	attendeeRegistrationLabel: PropTypes.string,
	attendeeButtonLabel: PropTypes.string,
	cancelLabel: PropTypes.string,
	createLabel: PropTypes.string,
	onCreate: PropTypes.func,
	onCancel: PropTypes.func,
};

TicketForm.defaultProps = {
	ticketCapacityLabel: __( 'Ticket Capacity', 'events-gutenberg' ),
	ticketCapacityToolTip: __( 'Ticket capacity', 'events-gutenberg' ),
	attendeeRegistrationLabel: __( 'Attendee Registration', 'events-gutenberg' ),
	attendeeButtonLabel: __( '+Add', 'events-gutenberg' ),
	cancelLabel: __( 'Cancel', 'events-gutenberg' ),
	createLabel: __( 'Create Ticket', 'events-gutenberg' ),
	onCreate: noop,
	onCancel: noop,
};

export default TicketForm;
