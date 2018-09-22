/**
 * External dependencies
 */
import React, { Fragment } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ContainerPanel } from '@moderntribe/tickets/elements';
import { LAYOUT } from '@moderntribe/tickets/elements/container-panel/element';
import StatusIcons from '../../ticket/status-icon/element';
import TicketHeader from './header/template';
import TicketContent from './content/template';

const TicketEditContainer = () => (
	<ContainerPanel
		className="tribe-editor__ticket-container"
		layout={ LAYOUT.ticket }
		icon={ <StatusIcons expires={ true } /> }
		header={ <TicketHeader /> }
		content={ <TicketContent /> }
	/>
);

export default TicketEditContainer;
