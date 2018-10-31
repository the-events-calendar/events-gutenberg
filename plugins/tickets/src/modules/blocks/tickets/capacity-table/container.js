/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import CapacityTable from './template';
import { withStore } from '@moderntribe/common/src/modules/hoc';
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state ) => ( {
	sharedCapacity: selectors.getSharedCapacity( state ),
	totalCapacity: selectors.getTotalCapacity( state ),
	independentTickets: selectors.getIndependentTickets( state ),
	sharedTickets: selectors.getSharedTickets( state ),
	sharedRemaining: selectors.getSharedRemaining( state ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
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
