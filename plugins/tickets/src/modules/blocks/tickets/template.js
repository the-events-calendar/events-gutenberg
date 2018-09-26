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
import './style.pcss';

class TicketsTemplate extends PureComponent {
	static propTypes = {
		isSelected: PropTypes.bool,
		isBlockSelected: PropTypes.bool,
		setIsSelected: PropTypes.func,
		isEditing: PropTypes.bool,
	};

	static defaultProps = {
		isSelected: false,
		isEditing: false,
		isBlockSelected: false,
	};

	updateIsSelected = () => {
		const { setIsSelected, isSelected } = this.props;
		setIsSelected( isSelected );
	};

	componentDidMount() {
		this.updateIsSelected();
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.isSelected !== this.props.isSelected ) {
			this.updateIsSelected();
		}
	}

	componentWillUnmount() {
		this.updateIsSelected();
	}

	render() {
		const { isBlockSelected, isEditing, clientId } = this.props;
		return (
			<div
				className={ classNames(
					'tribe-editor__tickets-container',
					{ 'tribe-editor__tickets-container--selected': isBlockSelected },
				) }
			>
				<TicketsContainer
					isSelected={ isBlockSelected }
					isEditing={ isEditing }
					clientId={ clientId }
				/>
				<TicketsDashboard
					isSelected={ isBlockSelected }
					isEditing={ isEditing }
					clientId={ clientId }
				/>
			</div>
		);
	}
}

export default TicketsTemplate;
