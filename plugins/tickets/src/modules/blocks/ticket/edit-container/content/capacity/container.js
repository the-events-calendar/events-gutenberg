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
	independentValue: selectors.getTicketIndependentCapacity( state, ownProps ),
	sharedValue: selectors.getTicketSharedCapacity( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onSelectType( type ) {
		const { blockId } = ownProps;
		dispatch( actions.setCapacityType( blockId, type ) );
	},
	sharedOnChange( value ) {
		const { blockId } = ownProps;
		dispatch( actions.setSharedCapacity( blockId, value ) );
	},
	independentOnChange( value ) {
		const { blockId } = ownProps;
		dispatch( actions.setIndependentCapacity( blockId, value ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( Template );
