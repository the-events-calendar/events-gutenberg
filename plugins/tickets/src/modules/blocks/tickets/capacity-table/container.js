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
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onSharedCapacityChange: ( value ) => {
		dispatch( actions.setSharedCapacity( value ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( CapacityTable );
