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
import { withSaveData, withStore } from '@moderntribe/common/src/modules/hoc';
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';

// Header property is casted into a string as endpoint accepts a string as a value
const mapStateToProps = ( state, ownProps ) => ( {
	isSelected: ownProps.isSelected,
	isBlockSelected: selectors.getParentOrChildSelected( state ),
	isEditing: selectors.hasActiveBlockId( state ),
	clientId: ownProps.clientId,
	header: `${ selectors.getImageId( state ) }`,
	sharedCapacity: selectors.getSharedCapacity( state ),
	isLoading: selectors.isParentBlockLoading( state ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	setIsSelected( selected ) {
		dispatch( actions.setParentBlockSelected( selected ) );
	},
	setInitialState: ( props ) => {
		dispatch( actions.setInitialState( props ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( Template );
