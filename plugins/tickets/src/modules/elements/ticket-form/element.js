/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Header from './header/template';
import AttendeesRegistration from './attendees-registration/template';
import Capacity from './capacity/template';
import Footer from './footer/template';
import AdvancedOptions from './advanced-options/template';
import './style.pcss';

const TicketForm = ( props ) => {
	const {
		ticketCapacityLabel,
		ticketCapacityToolTip,
	} = props;
	return (
		<section className="tribe-editor__tickets-form">
			<Header />
			<div className="tribe-editor__tickets-form__container">
				<div className="tribe-editor__tickets-form__body">
					<Capacity label={ ticketCapacityLabel } tooltip={ ticketCapacityToolTip } />
					<AdvancedOptions />
					<AttendeesRegistration />
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
