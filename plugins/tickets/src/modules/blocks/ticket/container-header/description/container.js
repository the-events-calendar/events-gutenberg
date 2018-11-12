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
	/**
	 * @todo: fix this
	 */
	isDisabled: false,
	tempDescription: selectors.getTicketTempDescription( state, ownProps ),
	description: selectors.getTicketDescription( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onTempDescriptionChange: ( e ) => dispatch( actions.setTicketTempDescription(
		ownProps.blockId,
		e.target.value,
	) ),
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( Template );
