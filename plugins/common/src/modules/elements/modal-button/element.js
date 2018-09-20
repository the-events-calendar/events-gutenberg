/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { Modal } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Button from '@moderntribe/common/elements/button/element';

class ModalButton extends PureComponent {
	static propTypes = {
		className: PropTypes.string,
		closeLabel: PropTypes.string,
		label: PropTypes.string,
		modalTitle: PropTypes.string,
		onClick: PropTypes.func,
		onClose: PropTypes.func,
		onCloseClick: PropTypes.func,
		onOpen: PropTypes.func,
	}

	constructor( props ) {
		super( props );
		this.state = {
			isOpen: false,
		};
	}

	onClick = ( e ) => {
		this.props.onClick && this.props.onClick( e );
		this.onOpen();
		this.setState( { isOpen: true } );
	};

	onCloseClick = ( e ) => {
		this.props.onCloseClick && this.props.onCloseClick( e );
		this.onRequestClose();
	}

	onRequestClose = () => {
		this.onClose();
		this.setState( { isOpen: false } );
	}

	onOpen = () => this.props.onOpen && this.props.onOpen();

	onClose = () => this.props.onClose && this.props.onClose();

	renderModal = () => {
		const { closeLabel, modalTitle } = this.props;
		return ( this.state.isOpen && (
			<Modal
				title={ modalTitle }
				onRequestClose={ this.onRequestClose }
			>
				<Button
					className="tribe-editor__modal-button__close-button"
					onClick={ this.onCloseClick }
				>
					{ closeLabel }
				</Button>
			</Modal>
		) );
	};

	render() {
		const { className, label } = this.props;
		return (
			<div className={ classNames(
				'tribe-editor__modal-button',
				className,
			) }>
				<Button
					className="tribe-editor__modal-button__button"
					onClick={ this.onClick }
				>
					{ label }
				</Button>
				{ this.renderModal() }
			</div>
		);
	}
}

export default ModalButton;
