/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import DisabledTickets from './DisabledTickets';
import {
	Availability,
	ActionDashboard,
} from '@moderntribe/tickets/elements';
import './style.pcss';

const disabled = {
	title: __( 'No Active Tickets', 'events-gutenberg' ),
	description: __(
		'The time is curently outside of the ticket sales window. Make adjustments to the start and end date to activate these tickets.',
		'events-gutenberg'
	),
}

const TicketsTemplate = ( props ) => {
	const {
		selected,
		available,
		total,
		footerActions,
		footerConfirmLabel,
	} = props;

	const availability = selected && (
		<Availability available={ available } total={ total } />
	);

	const actionDashboard = selected && (
		<ActionDashboard
			actions={ footerActions }
			confirmLabel={ footerConfirmLabel }
		/>
	);

	return (
		<div
			className={ classNames(
				'tribe-editor__tickets-container',
				{ 'tribe-editor__tickets-container--selected': selected },
			) }
		>
			<div className="tribe-editor__tickets-body">
				<DisabledTickets title={ disabled.title }>
					{ disabled.description }
				</DisabledTickets>
			</div>
			{ availability }
			{ actionDashboard }
		</div>
	);
}

TicketsTemplate.propTypes = {
	selected: PropTypes.bool,
	footerActions: PropTypes.arrayOf( PropTypes.node ),
	footerConfirmLabel: PropTypes.string,
}

TicketsTemplate.defaultProps = {
	selected: false,
	footerActions: [],
	footerConfirmLabel: __( 'Add Tickets', 'events-gutenberg' ),
}

export default TicketsTemplate;
