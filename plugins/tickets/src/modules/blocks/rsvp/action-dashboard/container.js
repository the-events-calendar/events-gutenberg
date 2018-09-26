/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import RSVPActionDashboard from './template';
import { actions, selectors } from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore } from '@moderntribe/common/hoc';

const mapStateToProps = ( state ) => ( {
	created: selectors.getRSVPCreated( state ),
	isCancelDisabled: ! selectors.getRSVPHasChanges( state ),
	isConfirmDisabled: ! selectors.getRSVPTempTitle( state ) || ! selectors.getRSVPHasChanges( state ),
	showCancel: selectors.getRSVPCreated( state ),
	state,
} );

const mergeProps = ( stateProps, dispatchProps, ownProps ) => ( {
	...ownProps,
	created: stateProps.created,
	isCancelDisabled: stateProps.isCancelDisabled,
	isConfirmDisabled: stateProps.isConfirmDisabled,
	showCancel: stateProps.showCancel,
	onCancelClick: () => {
		const { dispatch } = dispatchProps;
		dispatch( actions.setRSVPTempDetails( {
			tempTitle: selectors.getRSVPTitle( stateProps.state ),
			tempDescription: selectors.getRSVPDescription( stateProps.state ),
			tempCapacity: selectors.getRSVPCapacity( stateProps.state ),
			tempNotGoingResponses: selectors.getRSVPNotGoingResponses( stateProps.state ),
			tempStartDate: selectors.getRSVPStartDate( stateProps.state ),
			tempStartDateObj: selectors.getRSVPStartDateObj( stateProps.state ),
			tempEndDate: selectors.getRSVPEndDate( stateProps.state ),
			tempEndDateObj: selectors.getRSVPEndDateObj( stateProps.state ),
			tempStartTime: selectors.getRSVPStartTime( stateProps.state ),
			tempEndTime: selectors.getRSVPEndTime( stateProps.state ),
		} ) );
		dispatch( actions.setRSVPHasChanges( false ) );
	},
	onConfirmClick: () => {
		const { dispatch } = dispatchProps;
		dispatch( actions.setRSVPDetails( {
			title: selectors.getRSVPTempTitle( stateProps.state ),
			description: selectors.getRSVPTempDescription( stateProps.state ),
			capacity: selectors.getRSVPTempCapacity( stateProps.state ),
			notGoingResponses: selectors.getRSVPTempNotGoingResponses( stateProps.state ),
			startDate: selectors.getRSVPTempStartDate( stateProps.state ),
			startDateObj: selectors.getRSVPTempStartDateObj( stateProps.state ),
			endDate: selectors.getRSVPTempEndDate( stateProps.state ),
			endDateObj: selectors.getRSVPTempEndDateObj( stateProps.state ),
			startTime: selectors.getRSVPTempStartTime( stateProps.state ),
			endTime: selectors.getRSVPTempEndTime( stateProps.state ),
		} ) );
		dispatch( actions.setRSVPHasChanges( false ) );
		! stateProps.created && dispatch( actions.createRSVP() );
	},
} );

export default compose(
	withStore(),
	connect( mapStateToProps, null, mergeProps ),
)( RSVPActionDashboard );
