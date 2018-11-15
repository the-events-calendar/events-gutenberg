/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import TicketsDashboard from './dashboard/container';
import TicketsContainer from './container/container';
import TicketControls from './controls/container';
import './style.pcss';

class Tickets extends PureComponent {
	static propTypes = {
		isSelected: PropTypes.bool,
		clientId: PropTypes.string,
	};

	render() {
		const {
			isSelected,
			clientId
		} = this.props;

		return (
			<div
				className={ classNames(
					'tribe-editor__tickets',
					{ 'tribe-editor__tickets--selected': isSelected },
				) }
			>
				<TicketsContainer isSelected={ isSelected } />
				<TicketsDashboard isSelected={ isSelected } clientId={ clientId } />
				<TicketControls />
			</div>
		);
	}
}

export default Tickets;
