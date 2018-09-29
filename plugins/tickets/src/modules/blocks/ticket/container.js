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
		isBlockSelected: selectors.getParentOrChildSelected( state ),
		isEditing: selectors.getTicketEditing( state, props ),
		hasBeenCreated: false,
		title: selectors.getTicketTitle( state, props ),
		description: selectors.getTicketDescription( state, props ),
		price: selectors.getTicketPrice( state, props ),
		SKU: selectors.getTicketSKU( state, props ),
		dateIsPristine: ! selectors.getTicketExpires( state, props ),
	};
};

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
	setInitialState( props ) {
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

