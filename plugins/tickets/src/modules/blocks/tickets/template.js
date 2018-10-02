/**
 * External dependencies
 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import TicketsDashboard from './dashboard/container';
import TicketsContainer from './container/container';
import TicketControls from './controls/container';
import './style.pcss';

class TicketsTemplate extends PureComponent {
	static propTypes = {
		isSelected: PropTypes.bool,
		isBlockSelected: PropTypes.bool,
		setIsSelected: PropTypes.func,
		isEditing: PropTypes.bool,
		isLoading: PropTypes.bool,
		clientId: PropTypes.string,
	};

	static defaultProps = {
		isSelected: false,
		isEditing: false,
		isBlockSelected: false,
		isLoading: false,
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

	renderComponents() {
		const { isBlockSelected, isEditing, clientId } = this.props;

		return [
			<Fragment>
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
			</Fragment>,
			<TicketControls />,
		];
	}

	render() {
		const { isBlockSelected } = this.props;
		return (
			<div
				className={ classNames(
					'tribe-editor__tickets-container',
					{ 'tribe-editor__tickets-container--selected': isBlockSelected },
				) }
			>
				{ this.renderComponents() }
			</div>
		);
	}
}

export default TicketsTemplate;
