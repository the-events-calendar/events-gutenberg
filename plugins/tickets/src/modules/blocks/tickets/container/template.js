/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Wordpress dependencies
 */
import { InnerBlocks } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Availability from '../availability/element';
import { InactiveBlock } from '@moderntribe/tickets/elements';
import { LAYOUT } from '@moderntribe/tickets/elements/inactive-block/element';
import StatusIcon from '@moderntribe/tickets/blocks/ticket/display-container/status-icon/element';
import './style.pcss';

const TicketContainer = ( { isSelected, isEditing, total, sold, tickets, isLoading, isTicketDisabled } ) => (
	<div className="tribe-editor__ticket-container">
		<div className="tribe-editor__tickets-body">
			<InnerBlocks allowedBlocks={ [ 'tribe/event-tickets-ticket' ] } />
		</div>
		{ tickets.length === 0 && (
			<InactiveBlock
				layout={ LAYOUT.ticket }
				title={ __( 'There are no tickets yet', 'events-gutenberg' ) }
				description={ __( 'Edit this block to create your first ticket.', 'events-gutenberg' ) }
				icon={ <StatusIcon disabled={ true } /> }
			/>
		) }
		{ isSelected && ! isEditing && ! isLoading && (
			<Availability available={ total - sold } total={ total } isDisabled={ isTicketDisabled } />
		) }
	</div>
);

TicketContainer.propTypes = {
	isSelected: PropTypes.bool,
	isEditing: PropTypes.bool,
	isLoading: PropTypes.bool,
	isTicketDisabled: PropTypes.bool,
	total: PropTypes.number,
	sold: PropTypes.number,
};

export default TicketContainer;
