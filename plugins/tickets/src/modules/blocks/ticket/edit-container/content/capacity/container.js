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
	type: selectors.getTicketCapacityType( state, ownProps ),
	capacity: selectors.getTicketCapacity( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onSelectType( type ) {
		const { blockId } = ownProps;
		dispatch( actions.setCapacityType( blockId, type ) );
	},
	sharedOnChange( value ) {
		const { blockId } = ownProps;
		dispatch( actions.setCapacity( blockId, value ) );
	},
	independentOnChange( value ) {
		const { blockId } = ownProps;
		dispatch( actions.setCapacity( blockId, value ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( Template );
