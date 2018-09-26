/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';

/**
 * Internal dependencies
 */
import CapacityTable from './template';
import { withStore } from '@moderntribe/common/src/modules/hoc';
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state ) => ( {
	sharedValue: selectors.getSharedCapacity( state ),
	total: selectors.getTotalCapacity( state ),
	independent: selectors.getIndependentTickets( state ),
	shared: selectors.getSharedTickets( state ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onSharedCapacityChange: ( value ) => {
		dispatch( actions.setTotalSharedCapacity( value ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( CapacityTable );
