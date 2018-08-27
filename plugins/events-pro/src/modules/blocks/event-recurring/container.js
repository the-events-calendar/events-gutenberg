/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import { withStore } from '@moderntribe/common/hoc';
import { selectors, actions } from '@moderntribe/events-pro/data/ui';
import EventRecurringBlock from './template';

/**
 * Module Code
 */

const mapStateToProps = state => ( {
	isRepeatBlockVisible: selectors.isRepeatBlockVisible( state ),
	isRulePanelVisible: selectors.isRulePanelVisible( state ),
	isExceptionPanelVisible: selectors.isExceptionPanelVisible( state ),
	isRulePanelExpanded: selectors.isRulePanelExpanded( state ),
	isExceptionPanelExpanded: selectors.isExceptionPanelExpanded( state ),
} );

const mapDispatchToProps = dispatch => ( {
	toggleRepeatBlocksVisibility: () => dispatch( actions.toggleRepeatBlocksVisibility() ),
	toggleRulePanelVisibility: () => dispatch( actions.toggleRulePanelVisibility() ),
	toggleExceptionPanelVisibility: () => dispatch( actions.toggleExceptionPanelVisibility() ),
	toggleRulePanelExpand: () => dispatch( actions.toggleRulePanelExpand() ),
	toggleExceptionPanelExpand: () => dispatch( actions.toggleExceptionPanelExpand() ),
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...stateProps,
	...dispatchProps,
	...ownProps,
	initialRepeatBlockClick: compose(
		dispatchProps.toggleRulePanelVisibility,
		dispatchProps.toggleRulePanelExpand,
		dispatchProps.toggleRepeatBlocksVisibility,
	),
	initialRulePanelClick: compose(
		dispatchProps.toggleRulePanelVisibility,
		dispatchProps.toggleRulePanelExpand,
	),
	initialExceptionPanelClick: compose(
		dispatchProps.toggleExceptionPanelVisibility,
		dispatchProps.toggleExceptionPanelExpand,
	),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps )
)( EventRecurringBlock );
