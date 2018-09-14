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

/*
		<section className="tribe-editor__tickets-form">
				<div></div>
				<div className="tribe-editor__tickets-form__container">
					<div className="tribe-editor__tickets-form__body">
						<div className="tribe-editor__tickets-form__row">
							<div className="tribe-editor__tickets-form__labels">
								<label>Ticket Capacity</label>
							</div>
							<div className="tribe-editor__tickets-form__input-group">
								<select>
									<option>Share capacity with other tickets</option>
									<option>Set capacity for this ticket only</option>
									<option>unlimited</option>
								</select>
								<div className="tribe-editor__tickets-form__input-row">
									<label htmlFor="ticket-available">Number of tickets available</label>
									<input type="number" id="ticket-available" />
								</div>
								<div className="tribe-editor__tickets-form__input-row">
									<label htmlFor="ticket-limit">(optional) Limit sales of this ticket to:</label>
									<input type="number" id="ticket-limit"/>
								</div>
								<div className="tribe-editor__tickets-form__input-row">
									<label htmlFor="ticket-capacity">Capacity</label>
									<input type="number" id="ticket-capacity" />
								</div>
							</div>
						</div>
						<div className="tribe-editor__tickets-attendee">
							<span>Attendee Registration</span>
							<button className="tribe-editor__btn--label">+Add</button>
						</div>
					</div>
					<div className="tribe-editor__tickets-form__footer">
						<button className="tribe-editor__btn--label">Cancel</button>
						<button className="tribe-editor__btn--label">Create Ticket</button>
					</div>
				</div>
			</section>
 */
