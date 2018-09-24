/**
 * External dependencies
 */
import React, { Fragment } from 'react';

/**
 * Internal dependencies
 */
import { ContainerPanel } from '@moderntribe/tickets/elements';
import { LAYOUT } from '@moderntribe/tickets/elements/container-panel/element';
import StatusIcons from '@moderntribe/tickets/blocks/ticket/status-icon/element';
import TicketHeader from './header/template';
import TicketContent from './content/template';

const TicketEditContainer = () => (
	<ContainerPanel
		className="tribe-editor__edit-ticket-container"
		layout={ LAYOUT.ticket }
		icon={ <StatusIcons expires={ true } /> }
		header={ <TicketHeader /> }
		content={ <TicketContent /> }
	/>
);

export default TicketEditContainer;
