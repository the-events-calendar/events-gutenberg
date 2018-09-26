/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import Template from './template';

import { withSaveData, withStore } from '@moderntribe/common/src/modules/hoc';
import { actions, selectors } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state, ownProps ) => ( {
	title: selectors.getTicketTitle( state, ownProps ),
	description: selectors.getTicketDescription( state, ownProps ),
	price: selectors.getTicketPrice( state, ownProps ),
	unlimited: selectors.getTicketCapacityType( state, ownProps ),
	quantity: selectors.getTicketCapacity( state, ownProps ),
	expires: selectors.getTicketExpires( state, ownProps ),
	sold: selectors.getTicketSold( state, ownProps ),
	isUnlimited: selectors.getTicketUnlimited( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	editBlock() {
		const { blockId } = ownProps;
		dispatch( actions.setTicketIsEditing( blockId, true ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withSaveData(),
)( Template );

