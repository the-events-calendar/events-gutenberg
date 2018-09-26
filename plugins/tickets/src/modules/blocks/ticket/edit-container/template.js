/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { ContainerPanel } from '@moderntribe/tickets/elements';
import { LAYOUT } from '@moderntribe/tickets/elements/container-panel/element';
import StatusIcons from '@moderntribe/tickets/blocks/ticket/display-container/status-icon/element';
import TicketHeader from './header/container';
import TicketContent from './content/template';

class TicketEditContainer extends PureComponent {
	static propTypes = {
		blockId: PropTypes.string.isRequired,
	}

	render() {
		const { blockId } = this.props;

		return (
			<ContainerPanel
				className="tribe-editor__edit-ticket-container"
				layout={ LAYOUT.ticket }
				icon={ <StatusIcons expires={ true } /> }
				header={ <TicketHeader blockId={ blockId } /> }
				content={ <TicketContent blockId={ blockId } /> }
			/>
		);
	}
}

export default TicketEditContainer;
