/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

/**
 * Internal dependencies
 */
import withSaveData from 'editor/hoc/with-save-data';
import { withStore } from 'editor/hoc';
import {
	actions as priceActions,
	selectors as priceSelectors,
} from 'data/blocks/price';
import {
	actions as UIActions,
	selectors as UISelectors,
} from 'data/ui';
import EventPrice from './template';

const mapStateToProps = ( state ) => ( {
	dashboardOpen: UISelectors.getDashboardPriceOpen( state ),
	cost: priceSelectors.getPrice( state ),
	currencyPosition: priceSelectors.getPosition( state ),
	currencySymbol: priceSelectors.getSymbol( state ),
	costDescription: priceSelectors.getDescription( state ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	...bindActionCreators( priceActions, dispatch ),
	...bindActionCreators( UIActions, dispatch ),
	setInitialState( props ) {
		dispatch( priceActions.setInitialState( props ) );
		dispatch( UIActions.setInitialState( props ) );
	},
} );

export default withStore()(
	compose(
		connect(
			mapStateToProps,
			mapDispatchToProps
		),
		withSaveData(),
	)( EventPrice )
);
