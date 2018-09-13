/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import {
	Availability,
	ActionDashboard,
	CapacityTable,
	HeaderImage,
	DisabledTickets,
} from '@moderntribe/tickets/elements';
import './style.pcss';

const disabled = {
	title: __( 'No Active Tickets', 'events-gutenberg' ),
	description: __(
		/* eslint-disable-next-line max-len */
		'The time is currently outside of the ticket sales window. Make adjustments to the start and end date to activate these tickets.',
		'events-gutenberg'
	),
};

const TicketsTemplate = ( props ) => {
	const {
		isSelected,
		available,
		total,
		footerActions,
		footerConfirmLabel,
		// @todo limit the usage of the available blocks for this one, however at this point the
		// appender button is only available on the paragraph block
		// see https://github.com/WordPress/gutenberg/issues/8589 once is resolved we should be able
		// to address this one and limit this to only this property
		allowedBlockTypes,
	} = props;

	const availability = isSelected && (
		<Availability available={ available } total={ total }/>
	);

	const actionDashboard = isSelected && (
		<ActionDashboard
			actions={ footerActions }
			confirmLabel={ footerConfirmLabel }
		/>
	);

	return (
		<div
			className={ classNames(
				'tribe-editor__tickets-container',
				{ 'tribe-editor__tickets-container--selected': isSelected },
			) }
		>
			<div className="tribe-editor__tickets-body">
				<InnerBlocks/>
				<DisabledTickets title={ disabled.title }>
					{ disabled.description }
				</DisabledTickets>
			</div>
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
			<CapacityTable />
			<HeaderImage />
			{ availability }
			{ actionDashboard }
		</div>
	);
};

TicketsTemplate.propTypes = {
	isSelected: PropTypes.bool,
	footerActions: PropTypes.arrayOf( PropTypes.node ),
	footerConfirmLabel: PropTypes.string,
	allowedBlockTypes: PropTypes.arrayOf( PropTypes.string ),
};

TicketsTemplate.defaultProps = {
	isSelected: false,
	footerActions: [],
	footerConfirmLabel: __( 'Add Tickets', 'events-gutenberg' ),
	allowedBlockTypes: [],
};

export default TicketsTemplate;
