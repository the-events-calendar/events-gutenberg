/**
 * External dependencies
 */
import { trim, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

/**
 * Internal dependencies
 */
import { searchParent } from 'editor/utils/dom';
import { parser, isFree } from 'utils/range';
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

const ESCAPE_KEY = 27;

const showCurrencySymbol = ( cost ) => {
	const parsed = parser( cost );
	return ! isEmpty( trim( parsed ) ) && ! isFree( cost );
};

const showCost = ( cost ) => {
	const parsed = parser( cost );
	return ! isEmpty( trim( parsed ) ) || isFree( cost );
};

const showCostDescription = ( description ) => ! isEmpty( trim( description ) );

const isTargetInBlock = ( target ) => (
	searchParent( target, ( testNode ) => {
		if ( testNode.classList.contains( 'editor-block-list__block' ) ) {
			return Boolean( testNode.querySelector( '.tribe-editor__event-price' ) );
		}
		return false;
	} )
);

const isTargetInSidebar = ( target ) => (
	searchParent( target, ( testNode ) => (
		testNode.classList.contains( 'edit-post-sidebar' )
	) )
);

const onKeyDown = ( e, dispatch ) => {
	if ( e.keyCode === ESCAPE_KEY ) {
		dispatch( UIActions.closeDashboardPrice() );
	}
};

const onClick = ( e, dispatch ) => {
	const { target } = e;
	if (
		! isTargetInBlock( target ) &&
		! isTargetInSidebar( target )
	) {
		dispatch( UIActions.closeDashboardPrice() );
	}
};

const mapStateToProps = ( state ) => ( {
	dashboardOpen: UISelectors.getDashboardPriceOpen( state ),
	cost: priceSelectors.getPrice( state ),
	currencyPosition: priceSelectors.getPosition( state ),
	currencySymbol: priceSelectors.getSymbol( state ),
	costDescription: priceSelectors.getDescription( state ),
	showCurrencySymbol: showCurrencySymbol( state.blocks.price.cost ),
	showCost: showCost( state.blocks.price.cost ),
	showCostDescription: showCostDescription( state.blocks.price.description ),
	isFree: isFree( state.blocks.price.cost ),
} );

const mapDispatchToProps = ( dispatch ) => ( {
	...bindActionCreators( priceActions, dispatch ),
	setInitialState: ( props ) => {
		dispatch( priceActions.setInitialState( props ) );
		dispatch( UIActions.setInitialState( props ) );
	},
	onKeyDown: ( e ) => onKeyDown( e, dispatch ),
	onClick: ( e ) => onClick( e, dispatch ),
	openDashboard: () => dispatch( UIActions.openDashboardPrice() ),
	setCurrencyPosition: ( value ) => dispatch( priceActions.togglePosition( ! value ) ),
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withSaveData(),
)( EventPrice );
