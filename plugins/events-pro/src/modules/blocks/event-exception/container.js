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
} );

const mapDispatchToProps = dispatch => ( {
	toggleExceptionPanelVisibility: () => dispatch( ui.actions.toggleExceptionPanelVisibility() ),
	toggleExceptionPanelExpand: () => dispatch( ui.actions.toggleExceptionPanelExpand() ),
	expandExceptionPanel: () => dispatch( ui.actions.expandExceptionPanel() ),
	addField: ( payload ) => dispatch( exception.actions.addField( payload ) ),
	removeField: ( id ) => dispatch( exception.actions.removeField( id ) ),
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...stateProps,
	...dispatchProps,
	...ownProps,
	initialExceptionPanelClick: compose(
		dispatchProps.toggleExceptionPanelVisibility,
		dispatchProps.expandExceptionPanel,
		// TODO: Add fields properly
		() => dispatchProps.addField( { id: Date.now() } )
	),
	// TODO: Add fields properly
	addField: () => dispatchProps.addField( { id: Date.now() } ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps, mergeProps )
)( EventRecurringBlock );
