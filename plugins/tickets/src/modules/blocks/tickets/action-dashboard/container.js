/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * WordPress dependencies
 */
import { dispatch as wpDispatch, select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Template from './template';
import { withStore } from '@moderntribe/common/src/modules/hoc';
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';

const mapStateToProps = ( state, ownProps ) => ( {
	/**
	 * @todo: fix this later
	 */
	isConfirmDisabled: false,
	showConfirm: true,
	onConfirmClick: () => {
		const { clientId } = ownProps;
		const { getBlockCount } = select( 'core/editor' );
		const { insertBlock } = wpDispatch( 'core/editor' );

		const nextChildPosition = getBlockCount( clientId );
		const block = createBlock( 'tribe/tickets-item', {} );
		insertBlock( block, nextChildPosition, clientId );
	},
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( Template );
