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

const getCapacity = ( state, ownProps, isShared ) => (
	isShared
		? selectors.getSharedCapacityInt( state )
		: selectors.getTicketCapacity( state, ownProps )
);

const getTotalSharedSold = ( state, isShared ) => (
	isShared ? selectors.getTicketsSharedSold( state ) : 0
);

const mapStateToProps = ( state, ownProps ) => {
	const isShared = selectors.isSharedTicket( state, ownProps );
	// Doing the parse at container level as empty value is used populate inputs
	const shared = parseInt( selectors.getSharedCapacity( state ), 10 );

	return {
		title: selectors.getTicketTitle( state, ownProps ),
		description: selectors.getTicketDescription( state, ownProps ),
		price: selectors.getTicketPrice( state, ownProps ),
		unlimited: selectors.getTicketCapacityType( state, ownProps ),
		capacity: getCapacity( state, ownProps, isShared ),
		sold: selectors.getTicketSold( state, ownProps ),
		totalSharedSold: getTotalSharedSold( state, isShared ),
		isUnlimited: selectors.isUnlimitedTicket( state, ownProps ),
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

