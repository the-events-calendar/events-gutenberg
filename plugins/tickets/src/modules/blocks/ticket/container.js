/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import get from 'lodash/get';

/**
 * Internal dependencies
 */
import Template from './template';

import { withSaveData, withStore } from '@moderntribe/common/src/modules/hoc';
import { actions, selectors } from '@moderntribe/tickets/data/blocks/ticket';
import { config } from '@moderntribe/common/src/modules/utils/globals';

const mapStateToProps = ( state, ownProps ) => {
	const props = { blockId: ownProps.clientId };
	return {
		isBlockSelected: selectors.getParentOrChildSelected( state ),
		isEditing: selectors.getTicketEditing( state, props ),
		blockId: ownProps.clientId,
		isSelected: ownProps.isSelected,
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
	}
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( Template );

