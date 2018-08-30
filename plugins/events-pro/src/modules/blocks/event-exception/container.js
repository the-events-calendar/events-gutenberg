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
	isExceptionPanelVisible: selectors.isExceptionPanelVisible( state ),
	isExceptionPanelExpanded: selectors.isExceptionPanelExpanded( state ),
} );

const mapDispatchToProps = dispatch => ( {
	toggleExceptionPanelVisibility: () => dispatch( actions.toggleExceptionPanelVisibility() ),
	toggleExceptionPanelExpand: () => dispatch( actions.toggleExceptionPanelExpand() ),
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...stateProps,
	...dispatchProps,
	...ownProps,
	initialExceptionPanelClick: compose(
		dispatchProps.toggleExceptionPanelVisibility,
		dispatchProps.toggleExceptionPanelExpand,
	),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps )
)( EventRecurringBlock );
