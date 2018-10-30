/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import { withStore } from '@moderntribe/common/hoc';
import * as ui from '@moderntribe/events-pro/data/ui';
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';
import EventRecurringBlock from './template';

/**
 * Module Code
 */

const mapStateToProps = state => ( {
	isRulePanelVisible: ui.selectors.isRulePanelVisible( state ),
	isRulePanelExpanded: ui.selectors.isRulePanelExpanded( state ),
	rules: recurring.selectors.getRules( state ),
	rulesCount: recurring.selectors.getRulesCount( state ),
	hasRules: recurring.selectors.hasRules( state ),
} );

const mapDispatchToProps = dispatch => ( {
	toggleRulePanelVisibility: () => dispatch( ui.actions.toggleRulePanelVisibility() ),
	toggleRulePanelExpand: () => dispatch( ui.actions.toggleRulePanelExpand() ),
	expandRulePanel: () => dispatch( ui.actions.expandRulePanel() ),
	addField: () => dispatch( recurring.actions.addField() ),
	removeRule: ( index ) => dispatch( recurring.actions.removeRule( index ) ),
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...stateProps,
	...dispatchProps,
	...ownProps,
	initialRulePanelClick: compose(
		dispatchProps.toggleRulePanelVisibility,
		dispatchProps.expandRulePanel,
		dispatchProps.addField
	),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps )
)( EventRecurringBlock );
