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
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state, ownProps ) => ( {
	sku: selectors.getTicketSku( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onChange: ( e ) => {
		const { blockId } = ownProps;
		dispatch( actions.setTicketSku( blockId, e.target.value ) );
		dispatch( actions.setTicketHasChanges( blockId, true ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( Template );
