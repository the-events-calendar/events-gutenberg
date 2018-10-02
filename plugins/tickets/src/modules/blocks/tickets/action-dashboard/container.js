/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * WordPress dependencies
 */
import { withDispatch, withSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Template from './template';
import { withStore } from '@moderntribe/common/src/modules/hoc';
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state, ownProps ) => ( {
	isEditFormValid: selectors.getTicketValidness( state, {
		blockId: ownProps.activeBlockId,
	} ),
	hasBeenCreated: selectors.getTicketHasBeenCreated( state, {
		blockId: ownProps.activeBlockId,
	} ),
	isBeenEdited: selectors.getTicketIsBeenEdited( state, {
		blockId: ownProps.activeBlockId,
	} ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	createNewEntry() {
		const { activeBlockId } = ownProps;
		dispatch( actions.createNewTicket( activeBlockId ) );
	},
	cancelEdit() {
		const { activeBlockId } = ownProps;
		dispatch( actions.cancelTicketEdit( activeBlockId ) );
	},
	updateTicket() {
		const { activeBlockId } = ownProps;
		dispatch( actions.updateTicket( activeBlockId ) );
	},
} );

const applyWithSelect = withSelect( ( select, ownProps ) => {
	const { getBlockCount } = select( 'core/editor' );
	const { clientId } = ownProps;
	return {
		nextChildPosition: getBlockCount( clientId ),
	};
} );

const applyWithDispatch = withDispatch( ( dispatch, ownProps ) => {
	const { removeBlock, insertBlock } = dispatch( 'core/editor' );

	return {
		onCancelClick() {
			const { activeBlockId, hasBeenCreated, isBeenEdited, cancelEdit } = ownProps;

			if ( isBeenEdited ) {
				cancelEdit();
			} else if ( ! hasBeenCreated ) {
				removeBlock( activeBlockId );
			}
		},
		onConfirmClick() {
			const { isEditing, createNewEntry, nextChildPosition, isBeenEdited, updateTicket } = ownProps;
			if ( isBeenEdited ) {
				updateTicket();
			} else if ( isEditing ) {
				createNewEntry();
			} else {
				const block = createBlock( 'tribe/event-tickets-ticket' );
				const { clientId } = ownProps;
				insertBlock( block, nextChildPosition, clientId );
			}
		},
	};
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	applyWithSelect,
	applyWithDispatch,
)( Template );
