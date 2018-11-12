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
import {
	selectors,
	actions,
} from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state, ownProps ) => ( {
	sharedCapacity: selectors.getTicketsSharedCapacity( state ),
	tempCapacityType: selectors.getTicketTempCapacityType( state, ownProps ),
	tempCapacity: selectors.getTicketTempCapacity( state, ownProps ),
	tempSharedCapacity: selectors.getTicketsTempSharedCapacity( state ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onTempCapacityChange: ( e ) => {
		const { blockId } = ownProps;
		dispatch( actions.setTicketTempCapacity( blockId, e.target.value ) );
	},
	onTempCapacityTypeChange: ( e ) => {
		const { blockId } = ownProps;
		dispatch( actions.setTicketTempCapacityType( blockId, e.target.value ) );
	},
	onTempSharedCapacityChange: ( e ) => (
		dispatch( actions.setTicketsTempSharedCapacity( e.target.value ) )
	),
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( Template );
