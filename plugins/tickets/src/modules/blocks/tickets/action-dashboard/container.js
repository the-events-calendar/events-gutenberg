/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';

/**
 * WordPress dependencies
 */
import { withDispatch, withSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Template from './template';
import { withSaveData, withStore } from '@moderntribe/common/src/modules/hoc';
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state, ownProps ) => ( {
	isEditFormValid: selectors.getTicketValidness( state, {
		blockId: ownProps.activeBlockId,
	} ),
	isVolatile: selectors.getTicketVolatile( state, {
		blockId: ownProps.activeBlockId,
	} ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	createNewEntry() {
		const { isEditing, activeBlockId } = ownProps;
		if ( isEditing ) {
			dispatch( actions.createNewTicket( activeBlockId ) );
		}
	},
} );

const applyWithSelect = withSelect( ( select, ownProps  ) => {
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
			const { activeBlockId } = ownProps;
			const { isVolatile } = ownProps;
			if ( isVolatile ) {
				removeBlock( activeBlockId );
			}
		},
		onConfirmClick() {
			const { isEditing, createNewEntry, nextChildPosition } = ownProps;
			if ( isEditing ) {
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
