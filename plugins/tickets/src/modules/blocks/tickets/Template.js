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
	HeaderImage,
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
		isSelected,
		available,
		total,
		footerActions,
		footerConfirmLabel,
	} = props;

	const availability = isSelected && (
		<Availability available={ available } total={ total } />
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
				<DisabledTickets title={ disabled.title }>
					{ disabled.description }
				</DisabledTickets>
			</div>
			<HeaderImage />
			{ availability }
			{ actionDashboard }
		</div>
	);
}

TicketsTemplate.propTypes = {
	isSelected: PropTypes.bool,
	footerActions: PropTypes.arrayOf( PropTypes.node ),
	footerConfirmLabel: PropTypes.string,
}

TicketsTemplate.defaultProps = {
	isSelected: false,
	footerActions: [],
	footerConfirmLabel: __( 'Add Tickets', 'events-gutenberg' ),
}

export default TicketsTemplate;
