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
	isBlockSelected: selectors.getParentOrChildSelected( state ),
	isEditing: selectors.getTicketEditing( state, { blockId: ownProps.clientId } ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	setIsSelected( selected ) {
		dispatch( actions.setChildBlockSelected( selected ) );
	},
	register() {
		const { clientId } = ownProps;
		dispatch( actions.registerTicketBlock( clientId ) );
	},
	unregister() {
		const { clientId } = ownProps;
		dispatch( actions.removeTicketBlock( clientId ) );
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

