/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import RSVPActionDashboard from './template';
import { actions, selectors, thunks } from '@moderntribe/tickets/data/blocks/rsvp';
import { withStore } from '@moderntribe/common/hoc';

const getIsCancelDisabled = ( state ) => (
	! selectors.getRSVPHasChanges( state ) || selectors.getRSVPLoading( state )
);

const getIsConfirmDisabled = ( state ) => (
	! selectors.getRSVPTempTitle( state )
		|| ! selectors.getRSVPHasChanges( state )
		|| selectors.getRSVPLoading( state )
);

const mapSelectToProps = ( select ) => ( {
	postId: select( 'core/editor' ).getCurrentPostId(),
} );

const mapStateToProps = ( state ) => ( {
	created: selectors.getRSVPCreated( state ),
	isCancelDisabled: getIsCancelDisabled( state ),
	isConfirmDisabled: getIsConfirmDisabled( state ),
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
		const { postId } = ownProps;
		const payload = {
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
		};

		dispatch( actions.setRSVPDetails( payload ) );
		dispatch( actions.setRSVPHasChanges( false ) );

		if ( ! stateProps.created ) {
			dispatch( actions.createRSVP() );
			dispatch( thunks.createRSVP( {
				...payload,
				postId,
			} ) );
		} else {
			dispatch( thunks.updateRSVP( {
				...payload,
				id: selectors.getRSVPId( stateProps.state ),
			} ) );
		}
	},
} );

export default compose(
	withStore(),
	withSelect( mapSelectToProps ),
	connect( mapStateToProps, null, mergeProps ),
)( RSVPActionDashboard );
