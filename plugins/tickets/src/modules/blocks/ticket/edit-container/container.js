/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';

/**
 * Internal dependencies
 */
import Template from './template';
import { withStore } from '@moderntribe/common/src/modules/hoc';
import { actions } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state, ownProps ) => ( {} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	register() {
		const { blockId } = ownProps;
		dispatch( actions.registerTicketBlock( blockId ) );
	},
	unregister() {
		const { blockId } = ownProps;
		dispatch( actions.removeTicketBlock( blockId ) );
	},
} );

export default compose(
	withStore(),
	connect(
		null,
		mapDispatchToProps,
	),
)( Template );
