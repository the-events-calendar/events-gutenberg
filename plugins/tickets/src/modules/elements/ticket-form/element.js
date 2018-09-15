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

import AttendeesRegistration from './attendees-registration/template';
import Capacity from './capacity/template';
import Footer from './footer/template';
import SKU from './sku/template';
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
					<Capacity label={ ticketCapacityLabel } tooltip={ ticketCapacityToolTip } />
					<AttendeesRegistration />
					<SKU onChange={ ( v ) => console.log( v ) }/>
				</div>
				<Footer />
			</div>
		</section>
	);
};

TicketForm.propTypes = {
	ticketCapacityLabel: PropTypes.string,
	ticketCapacityToolTip: PropTypes.string,
};

TicketForm.defaultProps = {
	ticketCapacityLabel: __( 'Ticket Capacity', 'events-gutenberg' ),
	ticketCapacityToolTip: __( 'Ticket capacity', 'events-gutenberg' ),
};

export default TicketForm;
