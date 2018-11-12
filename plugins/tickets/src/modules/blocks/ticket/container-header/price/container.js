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
	/**
	 * @todo: fix this later
	 */
	currencyPosition: 'prefix',
	currencySymbol: selectors.getTicketCurrencySymbol( state, ownProps ),
	tempPrice: selectors.getTicketTempPrice( state, ownProps ),
	price: selectors.getTicketPrice( state, ownProps ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onTempPriceChange: ( e ) => dispatch( actions.setTicketTempPrice(
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
