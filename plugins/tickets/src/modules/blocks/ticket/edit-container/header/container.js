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
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state, ownProps ) => ( {
	title: selectors.getTicketTitle( state, ownProps ),
	description: selectors.getTicketDescription( state, ownProps ),
	price: selectors.getTicketPrice( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	setTitle( title ) {
		const { blockId } = ownProps;
		dispatch( actions.setTitle( blockId, title ) );
	},
	setDescription( description ) {
		const { blockId } = ownProps;
		dispatch( actions.setDescription( blockId, description ) );
	},
	setPrice( price ) {
		const { blockId } = ownProps;
		dispatch( actions.setPrice( blockId, price ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( Template );
