/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import Template from './template';
import { withStore } from '@moderntribe/common/src/modules/hoc';
import { selectors } from '@moderntribe/tickets/data/blocks/ticket';

const getSharedSold = ( state, isShared ) => (
	isShared ? selectors.getTicketsSharedSold( state ) : 0
);

const mapStateToProps = ( state, ownProps ) => {
	const isShared = selectors.isSharedTicket( state, ownProps )

	return {
		/**
		 * @todo: fix this
		 */
		isDisabled: false,
		isShared,
		isUnlimited: selectors.isUnlimitedTicket( state, ownProps ),
		sold: selectors.getTicketSold( state, ownProps ),
		capacity: selectors.getTicketCapacity( state, ownProps ),
		sharedSold: getSharedSold( state, isShared ),
		sharedCapacity: selectors.getSharedCapacityInt( state ),
	};
};

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( Template );
