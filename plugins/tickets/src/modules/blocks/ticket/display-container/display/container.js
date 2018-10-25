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

const mapStateToProps = ( state, ownProps ) => {
	// Doing the parse at container level as empty value is used populate inputs
	const shared = parseInt( selectors.getSharedCapacity( state ), 10 );

	return {
		title: selectors.getTicketTitle( state, ownProps ),
		description: selectors.getTicketDescription( state, ownProps ),
		price: selectors.getTicketPrice( state, ownProps ),
		unlimited: selectors.getTicketCapacityType( state, ownProps ),
		capacity: selectors.getTicketCapacity( state, ownProps ),
		expires: selectors.getTicketExpires( state, ownProps ),
		sold: selectors.getTicketSold( state, ownProps ),
		isUnlimited: selectors.isUnlimitedTicket( state, ownProps ),
		isShared: selectors.isSharedTicket( state, ownProps ),
		shared: shared || 0,
		isTicketDisabled: selectors.isTicketDisabled( state, ownProps ),
		provider: selectors.getTicketProvider( state, ownProps ),
		currencySymbol: selectors.getTicketCurrency( state, ownProps ),
	};
};

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

