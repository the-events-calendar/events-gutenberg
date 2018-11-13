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
import * as exception from '@moderntribe/events-pro/data/blocks/exception';
import EventRecurringBlock from './template';

/**
 * Module Code
 */

const mapStateToProps = state => ( {
	isExceptionPanelVisible: ui.selectors.isExceptionPanelVisible( state ),
	isExceptionPanelExpanded: ui.selectors.isExceptionPanelExpanded( state ),
	exceptions: exception.selectors.getExceptions( state ),
	exceptionsCount: exception.selectors.getExceptionsCount( state ),
	hasExceptions: exception.selectors.hasExceptions( state ),
} );

const mapDispatchToProps = dispatch => ( {
	toggleExceptionPanelVisibility: () => dispatch( ui.actions.toggleExceptionPanelVisibility() ),
	toggleExceptionPanelExpand: () => dispatch( ui.actions.toggleExceptionPanelExpand() ),
	expandExceptionPanel: () => dispatch( ui.actions.expandExceptionPanel() ),
	addField: ( payload ) => dispatch( exception.actions.addField( payload ) ),
	removeException: ( id ) => dispatch( exception.actions.removeException( id ) ),
	editException: ( ...args ) => dispatch( exception.actions.editException( ...args ) ),
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...stateProps,
	...dispatchProps,
	...ownProps,
	initialExceptionPanelClick: compose(
		dispatchProps.toggleExceptionPanelVisibility,
		dispatchProps.expandExceptionPanel,
		dispatchProps.addField
	),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps )
)( EventRecurringBlock );
