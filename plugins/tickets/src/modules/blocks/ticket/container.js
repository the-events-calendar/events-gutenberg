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
	const props = { blockId: ownProps.clientId };

	return {
		blockId: ownProps.clientId,
		isLoading: selectors.getTicketIsLoading( state, props ),
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	removeTicketBlock: () => {
		const { clientId } = ownProps;
		dispatch( actions.deleteTicket( clientId ) );
		dispatch( actions.removeTicketBlock( clientId ) );
	},
	setInitialState: ( props ) => {
		const { clientId } = ownProps;
		dispatch( actions.setTicketInitialState( props ) );
		dispatch( actions.registerTicketBlock( clientId ) );
	},
} );

export default compose(
	withStore( { isolated: true } ),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( Template );

