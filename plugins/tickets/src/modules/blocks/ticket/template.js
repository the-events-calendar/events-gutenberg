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
	};

	static defaultProps = {
		isEditing: false,
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
		const  { isEditing, clientId, isSelected }  = this.props;
		const containerClass = classNames( 'tribe-editor__ticket', {
			'tribe-editor__ticket--edit': isEditing,
			'tribe-editor__ticket--display': ! isEditing,
		} );
		return (
			<article className={ containerClass }>
				{ isEditing
					? <TicketEditContainer blockId={ clientId } />
					: <TicketDisplayContainer blockId={ clientId } isSelected={ isSelected } /> }
			</article>
		);
	}
}

export default Ticket;