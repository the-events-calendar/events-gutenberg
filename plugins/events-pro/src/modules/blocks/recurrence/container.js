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
import * as recurring from '@moderntribe/events-pro/data/blocks/recurring';
import EventRecurringBlock from './template';

/**
 * Module Code
 */

const mapStateToProps = state => ( {
	isRepeatBlockVisible: selectors.isRepeatBlockVisible( state ),
} );

const mapDispatchToProps = dispatch => ( {
	toggleRepeatBlocksVisibility: () => dispatch( actions.toggleRepeatBlocksVisibility() ),
	toggleRulePanelVisibility: () => dispatch( actions.toggleRulePanelVisibility() ),
	toggleRulePanelExpand: () => dispatch( actions.toggleRulePanelExpand() ),
	addField: ( payload ) => dispatch( recurring.actions.addField( payload ) ),
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...stateProps,
	...dispatchProps,
	...ownProps,
	initialRepeatBlockClick: compose(
		dispatchProps.toggleRulePanelVisibility,
		dispatchProps.toggleRulePanelExpand,
		dispatchProps.toggleRepeatBlocksVisibility,
		// TODO: Add fields properly
		() => dispatchProps.addField( { id: Date.now() } )
	),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps )
)( EventRecurringBlock );
