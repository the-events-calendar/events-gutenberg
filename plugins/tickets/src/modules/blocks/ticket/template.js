/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.pcss';
import TicketEditContainer from './edit-container/container';
import TicketDisplayContainer from './display-container/container';

class Ticket extends PureComponent {

	static propTypes = {
		isEditing: PropTypes.bool,
		setIsSelected: PropTypes.func,
		register: PropTypes.func.isRequired,
		unregister: PropTypes.func.isRequired,
		isSelected: PropTypes.bool,
		clientId: PropTypes.string.isRequired,
		hasBeenCreated: PropTypes.bool,
	};

	static defaultProps = {
		isEditing: false,
		hasBeenCreated: false,
	};

	updateIsSelected = () => {
		const { setIsSelected, isSelected } = this.props;
		setIsSelected( isSelected );
	};

	componentDidMount() {
		const { register } = this.props;
		register();
		this.updateIsSelected();
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.isSelected !== this.props.isSelected ) {
			this.updateIsSelected();
		}
	}

	componentWillUnmount() {
		const { unregister } = this.props;
		unregister();
		this.updateIsSelected();
	}

	render() {
		const { isEditing, clientId, isSelected, hasBeenCreated }  = this.props;
		const containerClass = classNames( 'tribe-editor__ticket', {
			'tribe-editor__ticket--edit': isEditing,
			'tribe-editor__ticket--display': ! isEditing,
		} );

		const showEditContainer = isEditing && ! hasBeenCreated;

		return (
			<article className={ containerClass }>
				{ showEditContainer
					? <TicketEditContainer blockId={ clientId } />
					: <TicketDisplayContainer blockId={ clientId } isSelected={ isSelected } /> }
			</article>
		);
	}
}

export default Ticket;
