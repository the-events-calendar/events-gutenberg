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

const mapStateToProps = ( state, ownProps ) => ( {
	isSelected: ownProps.isSelected,
	isBlockSelected: selectors.getParentOrChildSelected( state ),
	available: 48,
	total: 166,
	allowedBlockTypes: [ 'tribe/event-tickets', 'tribe/event-tickets-ticket', 'core/image' ],
	headerImageId: selectors.getImageID( state ),
	headerImage: selectors.getHeaderSize( state, { size: 'large' } ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	setHeaderImage( image ) {
		dispatch( actions.setHeader( image ) );
	},
	setIsSelected( selected ) {
		dispatch( actions.setParentBlockSelected( selected ) );
	}
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( Template );
