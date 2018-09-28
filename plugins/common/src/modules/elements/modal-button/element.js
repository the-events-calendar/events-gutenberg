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
		disabled: PropTypes.bool,
		label: PropTypes.string,
		modalContent: PropTypes.node,
		modalTitle: PropTypes.string,
		onClick: PropTypes.func,
		onClose: PropTypes.func,
		onOpen: PropTypes.func,
	};

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

	onRequestClose = () => {
		this.onClose();
		this.setState( { isOpen: false } );
	}

	onOpen = () => this.props.onOpen && this.props.onOpen();

	onClose = () => this.props.onClose && this.props.onClose();

	renderModal = () => {
		const { modalContent, modalTitle } = this.props;
		return ( this.state.isOpen && (
			<Modal
				title={ modalTitle }
				onRequestClose={ this.onRequestClose }
			>
				{ modalContent }
			</Modal>
		) );
	};

	render() {
		const { className, disabled, label } = this.props;
		return (
			<div className={ classNames(
				'tribe-editor__modal-button',
				className,
			) }>
				<Button
					className="tribe-editor__modal-button__button"
					onClick={ this.onClick }
					disabled={ disabled }
				>
					{ label }
				</Button>
				{ this.renderModal() }
			</div>
		);
	}
}

export default ModalButton;
